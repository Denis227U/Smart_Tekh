'use client';

import { useBuyNowStore } from './store';
import type { BuyNowActions } from './types';

export const useSetBuyNowItem = () =>
  useBuyNowStore((state: BuyNowActions) => state.setBuyNowItem);
export const useUpdateBuyNowQuantity = () =>
  useBuyNowStore((state: BuyNowActions) => state.updateBuyNowQuantity);
export const useClearBuyNow = () =>
  useBuyNowStore((state: BuyNowActions) => state.clearBuyNow);
