import { useCheckoutStore } from './store';

export const useCheckoutDelivery = () =>
  useCheckoutStore((state) => state.delivery);
export const useCheckoutPayment = () =>
  useCheckoutStore((state) => state.payment);
export const useCheckoutRecipient = () =>
  useCheckoutStore((state) => state.recipient);
export const useCheckoutIsRecipientValid = () =>
  useCheckoutStore((state) => state.isRecipientValid);
export const useCheckoutCachedPoints = () =>
  useCheckoutStore((state) => state.cachedPoints);
