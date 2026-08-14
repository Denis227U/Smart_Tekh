import { cacheLife, cacheTag } from 'next/cache';
import { prisma } from '@/src/shared/api';
import type { ProductCharacteristicDto } from '../model/types';

export const getProductCharacteristicsBySlug = async (
  productSlug: string,
): Promise<ProductCharacteristicDto[]> => {
  'use cache';
  cacheLife('days');
  cacheTag(`product-${productSlug}`, `product-${productSlug}-characteristics`);

  const characteristics = await prisma.productCharacteristic.findMany({
    where: {
      product: {
        slug: productSlug,
      },
    },
    orderBy: {
      priority: 'desc',
    },
    select: {
      id: true,
      name: true,
      value: true,
    },
  });

  return characteristics;
};
