import { z } from 'zod';
import { REVIEW_LIMITS, REVIEW_MESSAGES } from './constants';

export const reviewSchema = z.object({
  rating: z
    .number({
      message: REVIEW_MESSAGES.INVALID_RATING,
    })
    .min(REVIEW_LIMITS.MIN_RATING, { message: REVIEW_MESSAGES.INVALID_RATING })
    .max(REVIEW_LIMITS.MAX_RATING, { message: REVIEW_MESSAGES.INVALID_RATING }),
  text: z
    .string()
    .trim()
    .min(REVIEW_LIMITS.MIN_TEXT_LENGTH, {
      message: REVIEW_MESSAGES.minTextLength(REVIEW_LIMITS.MIN_TEXT_LENGTH),
    }),
});

export type ReviewInput = z.infer<typeof reviewSchema>;
