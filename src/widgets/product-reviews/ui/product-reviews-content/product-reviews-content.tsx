import { AddReviewTrigger } from '@/src/features/add-review';
import { SignInTrigger } from '@/src/features/auth';
import { ReviewCard } from '@/src/entities/review';
import type { ReviewDto } from '@/src/entities/review';
import { Heading } from '@/src/shared/ui/common';
import s from './product-reviews-content.module.scss';

export const ProductReviewsContent = ({
  title,
  productId,
  productSlug,
  reviews,
}: {
  title: string;
  productId: string;
  productSlug: string;
  reviews: ReviewDto[];
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
        {reviews.map((review) => (
          <ReviewCard
            key={review.id}
            className={s.reviewCard}
            id={review.id}
            authorName={review.authorName}
            avatarSrc={review.avatarSrc}
            createdAt={review.createdAt}
            rating={review.rating}
            text={review.text}
          />
        ))}

        <form className={s.form}>
          <AddReviewTrigger
            productId={productId}
            productSlug={productSlug}
            signInTrigger={<SignInTrigger />}
          />
        </form>
      </div>
    </div>
  );
};
