export const LABEL_CONFIG = {
  NEW: { days: 14 },
  SALE: { minDiscount: 40 },
  GOOD_PRICE: { minRating: 4.5, minDiscount: 10 },
  HITS: { minViews: 100 },
} as const;

export const VALID_SORT_VALUES = [
  'price_asc',
  'price_desc',
  'newest',
  'rating',
  'popular',
] as const;
