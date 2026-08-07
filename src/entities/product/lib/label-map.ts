import type { LabelType } from '../model/types';

interface LabelConfig {
  text?: string;
  className: string;
}

export const PRODUCT_LABEL_MAP: Record<LabelType, LabelConfig> = {
  NEW: {
    text: 'Новинка',
    className: 'isNew',
  },
  HIT: {
    text: 'Хит продаж',
    className: 'isHit',
  },
  SALE: {
    text: 'Акция',
    className: 'isOnSale',
  },
  GOOD_PRICE: {
    text: 'Хорошая цена',
    className: 'isGoodPrice',
  },
  DISCOUNT: {
    className: 'isDiscount',
  },
};
