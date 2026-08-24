import { Suspense } from 'react';
import { getProductBySlug } from '@/src/entities/product/server';
import { ProductDetailsContent } from './product-details-content/product-details-content';
import { ProductDetailsSkeleton } from './product-details-skeleton/product-details-skeleton';

const ProductDetailsAsync = async ({
  productSlug,
}: {
  productSlug: string;
}) => {
  const product = await getProductBySlug(productSlug);

  if (!product) return <div>Товар не найден</div>;

  return <ProductDetailsContent product={product} />;
};

export const ProductDetails = ({ productSlug }: { productSlug: string }) => {
  return (
    <Suspense fallback={<ProductDetailsSkeleton />}>
      <ProductDetailsAsync productSlug={productSlug} />
    </Suspense>
  );
};
