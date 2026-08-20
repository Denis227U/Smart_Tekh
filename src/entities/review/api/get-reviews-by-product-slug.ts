import { cacheLife, cacheTag } from 'next/cache';
import { mapToReviewtDto } from '@/src/entities/review/lib/map-to-review-dto';
import { prisma } from '@/src/shared/api';
import { ReviewDto } from '../model/types';

interface ProductReviewsData {
  productId: string;
  productTitle: string;
  reviews: ReviewDto[];
}

export const getReviewsByProductSlug = async (
  productSlug: string,
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

  return {
    productId: product.id,
    productTitle: product.title,
    reviews: product.reviews.map(mapToReviewtDto),
  };
};
