import { cacheLife, cacheTag } from 'next/cache';
import { prisma } from '@/src/shared/api';
import { mapToProductImageDto } from '../lib/map-to-product-image-dto';
import type { ProductImageDto } from '../model/types';

export const getProductImagesBySlug = async (
  productSlug: string,
): Promise<ProductImageDto[]> => {
  'use cache';
  cacheLife('days');
  cacheTag(`product-${productSlug}`, `product-${productSlug}-images`);

  const result = await prisma.product.findUnique({
    where: {
      slug: productSlug,
    },

    select: {
      images: {
        select: {
          id: true,
          url: true,
          thumbnail: true,
          alt: true,
        },
        orderBy: { priority: 'asc' },
      },
    },
  });

  if (!result) return [];

  return result.images.map(mapToProductImageDto);
};
