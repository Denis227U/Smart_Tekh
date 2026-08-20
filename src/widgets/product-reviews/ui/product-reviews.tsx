import { Suspense } from 'react';
import { getReviewsByProductSlug } from '@/src/entities/review/server';
import { ProductReviewsContent } from './product-reviews-content/product-reviews-content';
import { ProductReviewsSkeleton } from './product-reviews-skeleton/product-reviews-skeleton';

const ProductReviewsAsync = async ({
  productSlug,
}: {
  productSlug: string;
}) => {
  const productReviewsData = await getReviewsByProductSlug(productSlug);

  if (!productReviewsData) return <div>Не удалось загрузить отзывы</div>;

  const { productId, productTitle, reviews } = productReviewsData;

  return (
    <ProductReviewsContent
      title={`Отзывы на «${productTitle}»`}
      productId={productId}
      productSlug={productSlug}
      reviews={reviews}
    />
  );
};

export const ProductReviews = ({ productSlug }: { productSlug: string }) => {
  return (
    <Suspense fallback={<ProductReviewsSkeleton />}>
      <ProductReviewsAsync productSlug={productSlug} />
    </Suspense>
  );
};
