import { useCartStore } from './store';
import type { CartActions } from './types';

export const useAddToCart = () =>
  useCartStore((state: CartActions) => state.addItem);
export const useUpdateQuantity = () =>
  useCartStore((state: CartActions) => state.updateQuantity);
export const useRemoveItem = () =>
  useCartStore((state: CartActions) => state.removeItem);
export const useClearCart = () =>
  useCartStore((state: CartActions) => state.clearCart);
export const useCartInitialized = () =>
  useCartStore((state: CartActions) => state.setCartInitialized);
