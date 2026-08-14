import { Suspense } from 'react';
import {
  getProductBySlug,
  getProductCharacteristicsBySlug,
} from '@/src/entities/product/server';
import { ProductTabsContent } from './product-tabs-content';
import { ProductTabsSkeleton } from './product-tabs-skeleton/product-tabs-skeleton';

const ProductTabsAsync = async ({ productSlug }: { productSlug: string }) => {
  const product = await getProductBySlug(productSlug);
  const productCharacteristics =
    await getProductCharacteristicsBySlug(productSlug);

  if (!product) return <div>Товар не найден</div>;

  return (
    <ProductTabsContent
      title={product.title}
      description={product.description}
      characteristics={productCharacteristics}
    />
  );
};

export const ProductTabs = ({ productSlug }: { productSlug: string }) => {
  return (
    <Suspense fallback={<ProductTabsSkeleton />}>
      <ProductTabsAsync productSlug={productSlug} />
    </Suspense>
  );
};
