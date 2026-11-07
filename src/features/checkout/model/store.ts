import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CheckoutStore } from './types';

export const useCheckoutStore = create<CheckoutStore>()(
  persist(
    (set) => ({
      delivery: null,
      payment: null,
      recipient: null,

      setDeliveryData: (delivery) => set({ delivery }),
      setPaymentData: (payment) => set({ payment }),
      setRecipientData: (recipient) => set({ recipient }),
      resetCheckout: () =>
        set({ delivery: null, payment: null, recipient: null }),
    }),
    {
      name: 'checkout-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
