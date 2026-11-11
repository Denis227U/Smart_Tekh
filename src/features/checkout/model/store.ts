import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CheckoutStore } from './types';

export const useCheckoutStore = create<CheckoutStore>()(
  persist(
    (set) => ({
      delivery: null,
      payment: null,
      recipient: null,
      cachedPoints: {},

      setDeliveryData: (delivery) => set({ delivery }),
      setPaymentData: (payment) => set({ payment }),
      setRecipientData: (recipient) => set({ recipient }),
      resetCheckout: () =>
        set({ delivery: null, payment: null, recipient: null }),
      setCachedPoints: (city, points) =>
        set((state) => ({
          cachedPoints: {
            ...state.cachedPoints,
            [city]: points,
          },
        })),
    }),
    {
      name: 'checkout-storage',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        delivery: state.delivery,
        payment: state.payment,
        recipient: state.recipient,
      }),
    },
  ),
);
