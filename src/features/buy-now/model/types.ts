import { CartItemDto, CartProductDto } from '@/src/entities/cart';

export interface BuyNowState {
  item: CartItemDto | null;
}

export interface BuyNowActions {
  setBuyNowItem: (product: CartProductDto, quantity?: number) => void;
  updateBuyNowQuantity: (
    quantity: number,
    onError?: (maxStock: number) => void,
  ) => void;
  clearBuyNow: () => void;
}

export type BuyNowStore = BuyNowState & BuyNowActions;
