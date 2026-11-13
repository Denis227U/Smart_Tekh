import { useCheckoutStore } from './store';
import type { CheckoutActions } from './types';

export const useSetCheckoutDeliveryData = () =>
  useCheckoutStore((state: CheckoutActions) => state.setDeliveryData);
export const useSetCheckoutPaymentData = () =>
  useCheckoutStore((state: CheckoutActions) => state.setPaymentData);
export const useSetCheckoutCachedPoints = () =>
  useCheckoutStore((state: CheckoutActions) => state.setCachedPoints);
