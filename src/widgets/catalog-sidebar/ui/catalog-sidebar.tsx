import { Suspense } from 'react';
import {
  getCharacteristicFiltersByCategory,
  getProductPriceRangeByCategory,
} from '@/src/features/product-filter/server';
import type { ProductFilters } from '@/src/entities/product';
import { CatalogSidebarContent } from './catalog-sidebar-content/catalog-sidebar-content';
import { CatalogSidebarSkeleton } from './catalog-sidebar-skeleton/catalog-sidebar-skeleton';

const CatalogSidebarAsync = async ({ categorySlug }: ProductFilters) => {
  const priceRange = await getProductPriceRangeByCategory(categorySlug);

  if (!categorySlug) {
    return <CatalogSidebarContent priceRange={priceRange} />;
  }

  const characteristicGroups =
    await getCharacteristicFiltersByCategory(categorySlug);

  return (
    <CatalogSidebarContent
      characteristicGroups={characteristicGroups}
      priceRange={priceRange}
    />
  );
};

export const CatalogSidebar = ({ categorySlug }: ProductFilters) => {
  return (
    <Suspense fallback={<CatalogSidebarSkeleton />}>
      <CatalogSidebarAsync categorySlug={categorySlug} />
    </Suspense>
  );
};
