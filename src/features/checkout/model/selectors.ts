import { useCheckoutStore } from './store';

export const useCheckoutDelivery = () =>
  useCheckoutStore((state) => state.delivery);
