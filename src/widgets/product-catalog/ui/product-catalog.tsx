import { Suspense } from 'react';
import type { ProductFilters } from '@/src/entities/product';
import { getProductsByFilters } from '@/src/entities/product/server';
import { ProductCatalogContent } from './product-catalog-content/product-catalog-content';
import { ProductCatalogEmpty } from './product-catalog-empty/product-catalog-empty';
import { ProductCatalogSkeleton } from './product-catalog-skeleton/product-catalog-skeleton';

const ProductCatalogAsync = async ({
  categorySlug,
  priceMin,
  priceMax,
  characteristics,
  page,
}: ProductFilters) => {
  const { products, pagination } = await getProductsByFilters({
    categorySlug,
    priceMin,
    priceMax,
    characteristics,
    page,
  });

  if (!products.length) return <ProductCatalogEmpty />;

  return (
    <ProductCatalogContent
      products={products}
      totalPages={pagination.totalPages}
    />
  );
};

export const ProductCatalog = (props: ProductFilters) => {
  return (
    <Suspense fallback={<ProductCatalogSkeleton />}>
      <ProductCatalogAsync {...props} />
    </Suspense>
  );
};
