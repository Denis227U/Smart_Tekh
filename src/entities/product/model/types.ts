import { ProductGetPayload } from '@/src/shared/api/prisma/generated/models';

export type ProductWithCategory = ProductGetPayload<{
  include: {
    category: {
      select: {
        slug: true;
      };
    };
  };
}>;

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

export interface ProductsFilters {
  categorySlug?: string;
}
