import { ProductGetPayload } from '@/src/shared/api/prisma/generated/models';
import { VALID_SORT_VALUES } from './constants';

export type ProductWithCategory = ProductGetPayload<{
  include: {
    category: {
      select: {
        slug: true;
      };
    };
  };
}>;

type ProductWithImages = ProductGetPayload<{
  include: {
    images: {
      select: {
        id: true;
        url: true;
        thumbnail: true;
        alt: true;
      };
    };
  };
}>;

export type ProductImageDto = ProductWithImages['images'][number];

export type LabelType = 'NEW' | 'HIT' | 'SALE' | 'GOOD_PRICE' | 'DISCOUNT';

export type ProductDto = Omit<
  ProductWithCategory,
  'category' | 'categoryId' | 'price' | 'oldPrice' | 'rating' | 'updatedAt'
> & {
  categorySlug: string;
  price: number;
  oldPrice: number | null;
  rating: number;
  labels: LabelType[];
};

export interface CharacteristicFilter {
  name: string;
  values: string[];
}

export type ProductSort = (typeof VALID_SORT_VALUES)[number];

export interface ProductFilters {
  categorySlug?: string;
  priceMin?: number;
  priceMax?: number;
  characteristics?: CharacteristicFilter[];
  sort?: ProductSort;
  page?: number;
  perPage?: number;
}

export interface Pagination {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export type ProductCharacteristicDto = {
  id: string;
  name: string;
  value: string;
};
