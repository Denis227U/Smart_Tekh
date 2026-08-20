'use server';

import { revalidatePath, updateTag } from 'next/cache';
import { getCurrentUser } from '@/src/entities/user/server';
import { prisma } from '@/src/shared/api';
import { Prisma } from '@/src/shared/api/prisma/generated/client';
import { REVIEW_MESSAGES } from '../model/constants';
import { reviewSchema } from '../model/review-schema';

export const createReviewAction = async (
  productId: string,
  productSlug: string,
  formData: FormData,
) => {
  // Checking authorization
  const user = await getCurrentUser();
  if (!user) {
    return { success: false, message: REVIEW_MESSAGES.AUTH_REQUIRED };
  }

  const rawData = Object.fromEntries(formData);
  const dataToValidate = {
    ...rawData,
    rating: rawData.rating ? Number(rawData.rating) : undefined,
  };

  // Zod validation
  const validated = reviewSchema.safeParse(dataToValidate);
  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      success: false,
    };
  }

  // Duplicate checking: one review per user per product
  if (user.id) {
    const existingReview = await prisma.productReview.findFirst({
      where: { userId: user.id, productId },
    });

    if (existingReview) {
      return { success: false, message: REVIEW_MESSAGES.ALREADY_EXISTS };
    }
  }

  try {
    await prisma.$transaction(async (tx) => {
      await tx.productReview.create({
        data: {
          productId,
          userId: user.id,
          authorName: user.username || user.email!,
          text: validated.data.text,
          rating: validated.data.rating,
        },
      });

      // Aggregating count and average rating
      const aggregation = await tx.productReview.aggregate({
        where: { productId },
        _count: true,
        _avg: {
          rating: true,
        },
      });

      const newCount = aggregation._count ?? 0;
      const newRating = aggregation._avg.rating ?? 0;

      await tx.product.update({
        where: { id: productId },
        data: {
          reviewsCount: newCount,
          rating: newRating,
        },
      });
    });

    updateTag(`reviews-${productSlug}`);
    revalidatePath('/[categorySlug]/[productSlug]', 'page');
    return { success: true };
  } catch (error) {
    // Handling unique constraint violation.
    // Triggers on race conditions if two requests bypass findFirst.
    // Linked to the product_reviews_user_id_product_id_partial_idx partial SQL index.
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {
          success: false,
          message: REVIEW_MESSAGES.ALREADY_EXISTS,
        };
      }
    }

    console.error('Failed to create review:', error);
    return { success: false, message: REVIEW_MESSAGES.SAVE_ERROR };
  }
};
