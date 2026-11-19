import { useCheckoutStore } from './store';
import type { CheckoutActions } from './types';

export const useSetCheckoutDeliveryData = () =>
  useCheckoutStore((state: CheckoutActions) => state.setDeliveryData);
export const useSetCheckoutDeliveryDraft = () =>
  useCheckoutStore((state: CheckoutActions) => state.setDeliveryDraft);
export const useSetCheckoutPaymentData = () =>
  useCheckoutStore((state: CheckoutActions) => state.setPaymentData);
export const useSetCheckoutRecipientState = () =>
  useCheckoutStore((state: CheckoutActions) => state.setRecipientState);
export const useSetCheckoutCachedPoints = () =>
  useCheckoutStore((state: CheckoutActions) => state.setCachedPoints);
export const useResetCheckout = () =>
  useCheckoutStore((state: CheckoutActions) => state.resetCheckout);
