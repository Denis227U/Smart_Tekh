import { useClientStore } from '@/src/shared/lib/client';
import { useCartStore } from './store';
import type { CartState } from './types';

// Pure selectors
export const getCartItems = (state: CartState) => state.items;
export const getTotalItems = (state: CartState) =>
  state.items.reduce((sum, item) => sum + item.quantity, 0);
export const getTotalPrice = (state: CartState) =>
  state.items.reduce((sum, item) => sum + item.totalPrice, 0);
export const getIsCartInitialized = (state: CartState) =>
  state.isCartInitialized;

export const getCartItemQuantity = (productId: string) => (state: CartState) =>
  state.items.find((item) => item.productId === productId)?.quantity ?? 0;
export const getCartItemStock =
  (productId: string, fallbackStock: number) => (state: CartState) =>
    state.items.find((item) => item.productId === productId)?.product?.stock ??
    fallbackStock;
export const getIsInCart = (productId: string) => (state: CartState) =>
  state.items.some((item) => item.productId === productId);

// React hooks (SSR-safe)
export const useCartItems = () =>
  useClientStore(useCartStore, getCartItems, []);
export const useTotalItems = () =>
  useClientStore(useCartStore, getTotalItems, 0);
export const useTotalPrice = () =>
  useClientStore(useCartStore, getTotalPrice, 0);
export const useIsCartInitialized = () =>
  useClientStore(useCartStore, getIsCartInitialized, false);

export const useCartItemQuantity = (productId: string) =>
  useClientStore(useCartStore, getCartItemQuantity(productId), 0);
export const useCartItemStock = (productId: string, fallbackStock: number) =>
  useClientStore(
    useCartStore,
    getCartItemStock(productId, fallbackStock),
    fallbackStock,
  );
export const useIsInCart = (productId: string) =>
  useClientStore(useCartStore, getIsInCart(productId), false);
