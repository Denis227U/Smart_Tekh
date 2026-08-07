import { cacheLife, cacheTag } from 'next/cache';
import { prisma } from '@/src/shared/api';
import type {
  ProductOrderByWithRelationInput,
  ProductWhereInput,
} from '@/src/shared/api/prisma/generated/models';
import { mapToProductDto } from '../lib/map-to-product-dto';
import type { Pagination, ProductDto, ProductFilters } from '../model/types';

export const getProductsByFilters = async (
  filters: ProductFilters,
): Promise<{
  products: ProductDto[];
  pagination: Pagination;
}> => {
  'use cache';

  const {
    categorySlug,
    priceMin,
    priceMax,
    characteristics = [],
    sort = 'newest',
    page = 1,
    perPage = 9,
  } = filters;

  cacheLife('hours');
  cacheTag(
    'catalog-products',
    categorySlug ? `catalog-products-${categorySlug}` : 'catalog-products-all',
  );

  const conditions: ProductWhereInput[] = [];

  // 1. Filter by category
  if (categorySlug) {
    conditions.push({ category: { slug: categorySlug } });
  }

  // 2. Filter by price
  const hasMinPrice = priceMin !== undefined && !Number.isNaN(priceMin);
  const hasMaxPrice = priceMax !== undefined && !Number.isNaN(priceMax);

  if (priceMin !== undefined || priceMax !== undefined) {
    conditions.push({
      price: {
        ...(hasMinPrice && { gte: priceMin }),
        ...(hasMaxPrice && { lte: priceMax }),
      },
    });
  }

  // 3. Filter by characteristics
  characteristics.forEach(({ name, values }) => {
    if (values.length > 0) {
      conditions.push({
        characteristics: {
          some: {
            name,
            value: { in: values },
          },
        },
      });
    }
  });

  const where: ProductWhereInput =
    conditions.length > 0 ? { AND: conditions } : {};

  // Sorting
  let orderBy: ProductOrderByWithRelationInput;
  switch (sort) {
    case 'price_asc':
      orderBy = { price: 'asc' };
      break;
    case 'price_desc':
      orderBy = { price: 'desc' };
      break;
    case 'rating':
      orderBy = { rating: 'desc' };
      break;
    case 'popular':
      orderBy = { views: 'desc' };
      break;
    case 'newest':
    default:
      orderBy = { createdAt: 'desc' };
      break;
  }

  // Pagination
  const skip = (page - 1) * perPage;

  const [rawProducts, total] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy,
      skip,
      take: perPage,
      include: {
        category: { select: { slug: true } },
      },
    }),
    prisma.product.count({
      where,
    }),
  ]);

  return {
    products: rawProducts.map(mapToProductDto),
    pagination: {
      page,
      perPage,
      total,
      totalPages: Math.ceil(total / perPage),
    },
  };
};
