import { Suspense } from 'react';
import { getProductBySlug } from '@/src/entities/product/server';
import { getCurrentUser } from '@/src/entities/user/server';
import { ProductDetailsContent } from './product-details-content/product-details-content';
import { ProductDetailsSkeleton } from './product-details-skeleton/product-details-skeleton';

const ProductDetailsAsync = async ({
  productSlug,
}: {
  productSlug: string;
}) => {
  const product = await getProductBySlug(productSlug);
  const user = await getCurrentUser();

  if (!product) return <div>Товар не найден</div>;

  return (
    <ProductDetailsContent
      product={product}
      userId={user?.id}
    />
  );
};

export const ProductDetails = ({ productSlug }: { productSlug: string }) => {
  return (
    <Suspense fallback={<ProductDetailsSkeleton />}>
      <ProductDetailsAsync productSlug={productSlug} />
    </Suspense>
  );
};
