'use client';

import { useSearchParams } from 'next/navigation';
import {
  useBuyNowItem,
  useBuyNowHydrated,
  useBuyNowTotalItems,
  useBuyNowTotalPrice,
  useClearBuyNow,
} from '@/src/features/buy-now';
import {
  useCartHydrated,
  useCartItems,
  useClearCart,
  useIsCartInitialized,
  useTotalItems,
  useTotalPrice,
} from '@/src/entities/cart';

export const useCheckoutItemsSource = () => {
  const searchParams = useSearchParams();
  const isBuyNow = searchParams?.get('mode') === 'buy-now';

  const cartItems = useCartItems();
  const cartTotalCount = useTotalItems();
  const cartTotalPrice = useTotalPrice();
  const isCartInitialized = useIsCartInitialized();
  const isCartHydrated = useCartHydrated();
  const clearCart = useClearCart();

  const buyNowItem = useBuyNowItem();
  const buyNowTotalCount = useBuyNowTotalItems();
  const buyNowTotalPrice = useBuyNowTotalPrice();
  const isBuyNowHydrated = useBuyNowHydrated();
  const clearBuyNow = useClearBuyNow();

  if (isBuyNow) {
    return {
      isBuyNow: true,
      items: buyNowItem ? [buyNowItem] : [],
      totalCount: buyNowTotalCount,
      totalPrice: buyNowTotalPrice,
      isReady: isBuyNowHydrated,
      clearSource: clearBuyNow,
    };
  }

  return {
    isBuyNow: false,
    items: cartItems,
    totalCount: cartTotalCount,
    totalPrice: cartTotalPrice,
    isReady: isCartHydrated && isCartInitialized,
    clearSource: clearCart,
  };
};
