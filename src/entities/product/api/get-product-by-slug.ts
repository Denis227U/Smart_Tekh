import { cacheLife, cacheTag } from 'next/cache';
import { prisma } from '@/src/shared/api';
import { mapToProductDto } from '../lib/map-to-product-dto';
import type { ProductDto } from '../model/types';

export const getProductBySlug = async (
  productSlug: string,
): Promise<ProductDto | null> => {
  'use cache';
  cacheLife('days');
  cacheTag(`product-${productSlug}`);

  const product = await prisma.product.findUnique({
    where: {
      slug: productSlug,
    },

    include: {
      category: {
        select: {
          slug: true,
        },
      },
    },
  });

  return product ? mapToProductDto(product) : null;
};
