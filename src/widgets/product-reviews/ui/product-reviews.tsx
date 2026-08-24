import { Suspense } from 'react';
import { getReviewsByProductSlug } from '@/src/entities/review/server';
import { PRODUCT_REVIEWS_TEXTS, REVIEWS_PER_PAGE } from '../model/constants';
import { ProductReviewsContent } from './product-reviews-content/product-reviews-content';
import { ProductReviewsSkeleton } from './product-reviews-skeleton/product-reviews-skeleton';

const ProductReviewsAsync = async ({
  productSlug,
}: {
  productSlug: string;
}) => {
  const productReviewsData = await getReviewsByProductSlug(
    productSlug,
    REVIEWS_PER_PAGE,
  );

  if (!productReviewsData)
    return <div>{PRODUCT_REVIEWS_TEXTS.ERROR_LOADING}</div>;

  const { productId, productTitle, reviews, hasMore, nextCursor } =
    productReviewsData;

  return (
    <ProductReviewsContent
      title={`Отзывы на «${productTitle}»`}
      productId={productId}
      productSlug={productSlug}
      reviews={reviews}
      initialHasMore={hasMore}
      initialCursor={nextCursor}
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
