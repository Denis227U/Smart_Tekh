import { Suspense } from 'react';
import type { ProductsFilters } from '@/src/entities/product';
import { getProductsByFilters } from '@/src/entities/product/server';
import { ProductCatalogContent } from './product-catalog-content/product-catalog-content';
import { ProductCatalogEmpty } from './product-catalog-empty/product-catalog-empty';
import { ProductCatalogSkeleton } from './product-catalog-skeleton/product-catalog-skeleton';

const ProductCatalogAsync = async ({ categorySlug }: ProductsFilters) => {
  const data = await getProductsByFilters({
    categorySlug,
  });

  if (!data.length) return <ProductCatalogEmpty />;

  return <ProductCatalogContent products={data} />;
};

export const ProductCatalog = ({ categorySlug }: ProductsFilters) => {
  return (
    <Suspense fallback={<ProductCatalogSkeleton />}>
      <ProductCatalogAsync categorySlug={categorySlug} />
    </Suspense>
  );
};
