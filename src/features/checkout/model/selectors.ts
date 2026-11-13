import { useCheckoutStore } from './store';

export const useCheckoutDelivery = () =>
  useCheckoutStore((state) => state.delivery);
export const useCheckoutPayment = () =>
  useCheckoutStore((state) => state.payment);
export const useCheckoutCachedPoints = () =>
  useCheckoutStore((state) => state.cachedPoints);
