'use client';

import { useClientStore, useStoreHydration } from '@/src/shared/lib/client';
import { useBuyNowStore } from './store';
import type { BuyNowState } from './types';

// Pure selectors
export const getBuyNowItem = (state: BuyNowState) => state.item;
export const getBuyNowTotalItems = (state: BuyNowState) =>
  state.item?.quantity ?? 0;
export const getBuyNowTotalPrice = (state: BuyNowState) =>
  state.item?.totalPrice ?? 0;

// SSR-safe React hooks
export const useBuyNowItem = () =>
  useClientStore(useBuyNowStore, getBuyNowItem, null);
export const useBuyNowTotalItems = () =>
  useClientStore(useBuyNowStore, getBuyNowTotalItems, 0);
export const useBuyNowTotalPrice = () =>
  useClientStore(useBuyNowStore, getBuyNowTotalPrice, 0);
export const useBuyNowHydrated = () => useStoreHydration(useBuyNowStore);
