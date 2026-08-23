export const REVIEWS_PER_PAGE = 4;

export const REVIEW_ERROR_MESSAGES = {
  FETCH_FAILED: 'Не удалось загрузить отзывы. Попробуйте обновить страницу.',
} as const;

export const PRODUCT_REVIEWS_TEXTS = {
  ERROR_LOADING: 'Не удалось загрузить отзывы',
} as const;

export const PRODUCT_REVIEWS_CLIENT_TEXTS = {
  NETWORK_ERROR: 'Проблемы с соединением. Проверьте подключение к интернету.',
  RETRY_BUTTON: 'Повторить попытку',
} as const;
