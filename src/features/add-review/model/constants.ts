export const REVIEW_LIMITS = {
  MIN_TEXT_LENGTH: 8,
  MIN_RATING: 1,
  MAX_RATING: 5,
} as const;

export const REVIEW_MESSAGES = {
  AUTH_REQUIRED: 'Необходимо авторизоваться',
  ALREADY_EXISTS: 'Вы уже оставили отзыв на этот товар',
  SAVE_ERROR: 'Не удалось сохранить отзыв',
  minTextLength: (length: number) => `Минимальная длина — ${length} символов`,
  INVALID_RATING: `Рейтинг должен быть от ${REVIEW_LIMITS.MIN_RATING} до ${REVIEW_LIMITS.MAX_RATING}`,
} as const;

export const RATING_OPTIONS = Array.from({ length: 5 }, (_, i) => {
  const value = 5 - i;
  return {
    value,
    label: `${value} ★`,
  };
});
