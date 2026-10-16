import {
  CartItemFindManyArgs,
  CartItemGetPayload,
} from '@/src/shared/api/prisma/generated/models';

export const cartItemWithProductArgs = {
  include: {
    product: {
      select: {
        id: true,
        title: true,
        slug: true,
        coverThumbnail: true,
        coverImageAlt: true,
        price: true,
        oldPrice: true,
        stock: true,
      },
    },
  },
} satisfies CartItemFindManyArgs;

export type CartItemWithProduct = CartItemGetPayload<
  typeof cartItemWithProductArgs
>;

export type CartProductDto = {
  id: string;
  title: string;
  slug: string;
  price: number;
  oldPrice?: number | null;
  stock: number;
  coverThumbnail?: string | null;
  coverImageAlt?: string | null;
};

export type CartItemDto = Omit<
  CartItemWithProduct,
  'product' | 'createdAt' | 'updatedAt' | 'cartId'
> & {
  id?: string;
  productId: string;
  quantity: number;
  totalPrice: number;
  createdAt: string;
  product: CartProductDto;
};

export interface LocalCartItem {
  productId: string;
  quantity: number;
}

export interface CartState {
  items: CartItemDto[];
  isCartInitialized: boolean;
}

export interface CartActions {
  addItem: (
    productDto: CartItemDto['product'],
    productId: string,
    onError?: (maxStock: number) => void,
  ) => void;
  updateQuantity: (
    productId: string,
    quantity: number,
    onError?: (maxStock: number) => void,
  ) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  setItems: (items: CartItemDto[]) => void;
  setCartInitialized: (initialized: boolean) => void;
}

export type CartStore = CartState & CartActions;
