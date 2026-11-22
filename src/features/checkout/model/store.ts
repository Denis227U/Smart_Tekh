import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { TIMES } from '@/src/entities/order';
import { DeliveryType } from '@/src/shared/api/enums';
import { CITY_OPTIONS } from '@/src/shared/config';
import type { CheckoutStore } from './types';

const DEFAULT_DELIVERY_DRAFT = {
  deliveryType: DeliveryType.DELIVERY,
  city: CITY_OPTIONS[0].value,
  deliveryTime: TIMES[0].value,
};

export const useCheckoutStore = create<CheckoutStore>()(
  persist(
    (set) => ({
      delivery: null,
      deliveryDraft: DEFAULT_DELIVERY_DRAFT,
      payment: null,
      recipient: null,
      isRecipientValid: false,
      cachedPoints: {},

      setDeliveryData: (delivery) => set({ delivery }),
      setDeliveryDraft: (draft) =>
        set((state) => ({
          deliveryDraft: {
            ...state.deliveryDraft,
            ...draft,
          },
        })),
      setPaymentData: (payment) => set({ payment }),
      setRecipientState: (recipient, isValid) =>
        set({ recipient, isRecipientValid: isValid }),
      resetCheckout: () =>
        set({
          delivery: null,
          payment: null,
          recipient: null,
          deliveryDraft: DEFAULT_DELIVERY_DRAFT,
          isRecipientValid: false,
        }),
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
        deliveryDraft: state.deliveryDraft,
        payment: state.payment,
        recipient: state.recipient,
      }),
    },
  ),
);
