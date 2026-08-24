'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { ReviewCard, type ReviewDto } from '@/src/entities/review';
import { cn } from '@/src/shared/lib';
import { Button } from '@/src/shared/ui/client';
import { Loader } from '@/src/shared/ui/common';
import { fetchReviewsAction } from '../../api/fetch-reviews-action';
import {
  PRODUCT_REVIEWS_CLIENT_TEXTS,
  REVIEWS_PER_PAGE,
} from '../../model/constants';
import s from './product-reviews-list.module.scss';

interface ProductReviewsListProps {
  initialReviews: ReviewDto[];
  initialHasMore: boolean;
  initialCursor: string | null;
  productId: string;
  className?: string;
}

export const ProductReviewsList = ({
  initialReviews,
  initialHasMore,
  initialCursor,
  productId,
  className,
}: ProductReviewsListProps) => {
  const [reviews, setReviews] = useState<ReviewDto[]>(initialReviews);
  const [cursor, setCursor] = useState<string | null>(initialCursor);
  const [hasMore, setHasMore] = useState(initialHasMore);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [prevInitialReviews, setPrevInitialReviews] = useState(initialReviews);

  if (initialReviews !== prevInitialReviews) {
    setPrevInitialReviews(initialReviews);
    setReviews(initialReviews);
    setCursor(initialCursor);
    setHasMore(initialHasMore);
    setError(null);
  }

  // Tracks infinite scroll trigger
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    if (!inView || !hasMore || isLoading || error || !cursor) return;

    const loadMoreReviews = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchReviewsAction(
          productId,
          cursor,
          REVIEWS_PER_PAGE,
        );

        if (!response.success) {
          setError(response.error);
          return;
        }

        setReviews((prev) => [...prev, ...response.reviews]);
        setCursor(response.nextCursor);

        setHasMore(!!response.nextCursor);
      } catch (error) {
        console.error('Failed to load more reviews:', error);
        setError(PRODUCT_REVIEWS_CLIENT_TEXTS.NETWORK_ERROR);
      } finally {
        setIsLoading(false);
      }
    };

    loadMoreReviews();
  }, [inView, hasMore, isLoading, productId, cursor, error]);

  return (
    <div className={cn(s.list, className)}>
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          id={review.id}
          authorName={review.authorName}
          avatarSrc={review.avatarSrc}
          createdAt={review.createdAt}
          rating={review.rating}
          text={review.text}
        />
      ))}

      {hasMore && (
        <>
          {!error ? (
            <div
              ref={ref}
              className={s.cursor}
            >
              {isLoading ? (
                <Loader
                  color='dark'
                  size='md'
                />
              ) : null}
            </div>
          ) : (
            <div className={s.errorBlock}>
              <p>{error}</p>
              <Button
                variant='outline-gray'
                type='button'
                onClick={() => setError(null)}
                className={s.retryButton}
              >
                {PRODUCT_REVIEWS_CLIENT_TEXTS.RETRY_BUTTON}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
