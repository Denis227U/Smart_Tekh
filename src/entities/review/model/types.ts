import { ProductGetPayload } from '@/src/shared/api/prisma/generated/models';

type ProductWithReviews = ProductGetPayload<{
  include: {
    reviews: {
      select: {
        id: true;
        text: true;
        rating: true;
        createdAt: true;
        authorName: true;
        user: {
          select: {
            avatar: true;
          };
        };
      };
    };
  };
}>;

export type PrismaReview = ProductWithReviews['reviews'][number];

export interface ReviewDto {
  id: PrismaReview['id'];
  text: PrismaReview['text'];
  rating: PrismaReview['rating'];
  createdAt: PrismaReview['createdAt'];
  authorName: PrismaReview['authorName'];
  avatarSrc: NonNullable<PrismaReview['user']>['avatar'];
}
