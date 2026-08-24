import { cacheLife, cacheTag } from 'next/cache';
import { mapToReviewtDto } from '@/src/entities/review/lib/map-to-review-dto';
import { prisma } from '@/src/shared/api';
import { ReviewDto } from '../model/types';

interface ProductReviewsData {
  productId: string;
  productTitle: string;
  reviews: ReviewDto[];
  hasMore: boolean;
  nextCursor: string | null;
}

export const getReviewsByProductSlug = async (
  productSlug: string,
  take: number,
): Promise<ProductReviewsData | null> => {
  'use cache';
  cacheLife('seconds');
  cacheTag(`reviews-${productSlug}`);

  const product = await prisma.product.findUnique({
    where: {
      slug: productSlug,
    },
    select: {
      id: true,
      title: true,
      reviews: {
        orderBy: {
          createdAt: 'desc',
        },
        take: take + 1,
        include: {
          user: {
            select: {
              avatar: true,
            },
          },
        },
      },
    },
  });

  if (!product) return null;

  const hasMore = product.reviews.length > take;
  const slicedReviews = hasMore
    ? product.reviews.slice(0, take)
    : product.reviews;

  // Cursor is the last review ID in the list
  const nextCursor =
    slicedReviews.length > 0
      ? slicedReviews[slicedReviews.length - 1].id
      : null;

  return {
    productId: product.id,
    productTitle: product.title,
    reviews: slicedReviews.map(mapToReviewtDto),
    hasMore,
    nextCursor,
  };
};
