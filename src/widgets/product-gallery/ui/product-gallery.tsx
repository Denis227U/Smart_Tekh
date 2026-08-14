import { Suspense } from 'react';
import { getProductImagesBySlug } from '@/src/entities/product/server';
import { ProductGalleryContent } from './product-gallery-content/product-gallery-content';
import { ProductGallerySkeleton } from './product-gallery-skeleton/product-gallery-skeleton';

const ProductGalleryAsync = async ({
  productSlug,
}: {
  productSlug: string;
}) => {
  const images = await getProductImagesBySlug(productSlug);

  if (!images.length) return <div>Нет изображений</div>;

  return <ProductGalleryContent images={images} />;
};

export const ProductGallery = ({ productSlug }: { productSlug: string }) => {
  return (
    <Suspense fallback={<ProductGallerySkeleton />}>
      <ProductGalleryAsync productSlug={productSlug} />
    </Suspense>
  );
};
