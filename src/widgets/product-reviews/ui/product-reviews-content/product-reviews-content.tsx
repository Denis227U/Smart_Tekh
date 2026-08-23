import { AddReviewTrigger } from '@/src/features/add-review';
import { SignInTrigger } from '@/src/features/auth';
import type { ReviewDto } from '@/src/entities/review';
import { Heading } from '@/src/shared/ui/common';
import { ProductReviewsList } from '../product-reviews-list/product-reviews-list';
import s from './product-reviews-content.module.scss';

export const ProductReviewsContent = ({
  title,
  productId,
  productSlug,
  reviews,
  initialHasMore,
  initialCursor,
}: {
  title: string;
  productId: string;
  productSlug: string;
  reviews: ReviewDto[];
  initialHasMore: boolean;
  initialCursor: string | null;
}) => {
  return (
    <div aria-labelledby='product-reviews'>
      <Heading
        tag='h2'
        variant='h3'
        id='product-reviews'
        className={s.title}
      >
        {title}
      </Heading>

      <div className={s.grid}>
        <ProductReviewsList
          key={productId}
          initialReviews={reviews}
          productId={productId}
          className={s.reviewList}
          initialHasMore={initialHasMore}
          initialCursor={initialCursor}
        />

        <div className={s.form}>
          <AddReviewTrigger
            productId={productId}
            productSlug={productSlug}
            signInTrigger={<SignInTrigger />}
          />
        </div>
      </div>
    </div>
  );
};
