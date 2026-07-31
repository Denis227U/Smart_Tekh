import { cacheLife, cacheTag } from 'next/cache';
import { prisma } from '@/src/shared/api';
import { PriceRange } from '../model/types';

/**
 * Gets the minimum and maximum price range of products for the specified category.
 * Returns { min: 0, max: 0 } if there are no products in the category.
 * Returns the price range for all products if no category is provided.
 */
export async function getProductPriceRangeByCategory(
  categorySlug?: string,
): Promise<PriceRange> {
  'use cache';
  cacheLife('days');
  const tags = ['catalog-filters'];
  if (categorySlug) {
    tags.push(`catalog-filters-${categorySlug}`);
  }
  cacheTag(...tags);

  const where = categorySlug
    ? {
        category: { slug: categorySlug },
      }
    : {};

  const aggregations = await prisma.product.aggregate({
    where,
    _min: {
      price: true,
    },
    _max: {
      price: true,
    },
  });

  const minPrice = aggregations._min.price
    ? aggregations._min.price.toNumber()
    : 0;
  const maxPrice = aggregations._max.price
    ? aggregations._max.price.toNumber()
    : 0;

  return {
    min: minPrice,
    max: maxPrice,
  };
}
