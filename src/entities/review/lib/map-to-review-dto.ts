import type { PrismaReview, ReviewDto } from '../model/types';

export const mapToReviewtDto = (review: PrismaReview): ReviewDto => {
  return {
    id: review.id,
    text: review.text,
    rating: review.rating,
    authorName: review.authorName,
    createdAt: review.createdAt,
    avatarSrc: review.user?.avatar ?? null,
  };
};
