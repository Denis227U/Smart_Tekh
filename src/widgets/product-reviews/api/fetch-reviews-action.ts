'use server';

import { mapToReviewtDto, type ReviewDto } from '@/src/entities/review';
import { prisma } from '@/src/shared/api';
import { REVIEW_ERROR_MESSAGES, REVIEWS_PER_PAGE } from '../model/constants';

type FetchReviewsResult =
  | { success: true; reviews: ReviewDto[]; nextCursor: string | null }
  | { success: false; error: string };

export const fetchReviewsAction = async (
  productId: string,
  cursor: string | null,
  take: number = REVIEWS_PER_PAGE,
): Promise<FetchReviewsResult> => {
  try {
    const reviews = await prisma.productReview.findMany({
      where: { productId },
      orderBy: { createdAt: 'desc' },
      take: take + 1,
      ...(cursor && {
        skip: 1, // Skip cursor review
        cursor: { id: cursor },
      }),
      include: {
        user: {
          select: { avatar: true },
        },
      },
    });

    const hasMore = reviews.length > take;
    const slicedReviews = hasMore ? reviews.slice(0, take) : reviews;

    // Cursor is the last review ID in the list
    const nextCursor =
      slicedReviews.length > 0
        ? slicedReviews[slicedReviews.length - 1].id
        : null;

    return {
      success: true,
      reviews: slicedReviews.map(mapToReviewtDto),
      nextCursor: hasMore ? nextCursor : null,
    };
  } catch (serverError) {
    console.error('fetchReviewsAction execution failed:', serverError);
    return {
      success: false,
      error: REVIEW_ERROR_MESSAGES.FETCH_FAILED,
    };
  }
};
