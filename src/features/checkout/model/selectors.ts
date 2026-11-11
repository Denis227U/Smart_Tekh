import { useCheckoutStore } from './store';

export const useCheckoutDelivery = () =>
  useCheckoutStore((state) => state.delivery);
export const useCheckoutCachedPoints = () =>
  useCheckoutStore((state) => state.cachedPoints);
