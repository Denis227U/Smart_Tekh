import { cacheLife, cacheTag } from 'next/cache';
import { prisma } from '@/src/shared/api';
import type { ProductWhereInput } from '@/src/shared/api/prisma/generated/models';
import { mapToProductDto } from '../lib/map-to-product-dto';
import type { ProductsFilters } from '../model/types';

export const getProductsByFilters = async (filters: ProductsFilters) => {
  'use cache';
  const { categorySlug } = filters;

  cacheLife('days');
  cacheTag(
    'catalog',
    categorySlug ? `catalog-category-${categorySlug}` : 'catalog-all',
  );

  const conditions: ProductWhereInput[] = [];

  if (categorySlug) {
    conditions.push({ category: { slug: categorySlug } });
  }

  const where: ProductWhereInput =
    conditions.length > 0 ? { AND: conditions } : {};

  const products = await prisma.product.findMany({
    where,
    include: {
      category: { select: { slug: true } },
    },
  });

  return products.map(mapToProductDto);
};
