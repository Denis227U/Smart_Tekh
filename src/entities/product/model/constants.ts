export const LABEL_CONFIG = {
  NEW: { days: 14 },
  SALE: { minDiscount: 40 },
  GOOD_PRICE: { minRating: 4.5, minDiscount: 10 },
  HITS: { minViews: 100 },
} as const;
