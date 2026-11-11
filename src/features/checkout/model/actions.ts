import { useCheckoutStore } from './store';
import type { CheckoutActions } from './types';

export const useSetCheckoutDeliveryData = () =>
  useCheckoutStore((state: CheckoutActions) => state.setDeliveryData);
export const useSetCheckoutCachedPoints = () =>
  useCheckoutStore((state: CheckoutActions) => state.setCachedPoints);
