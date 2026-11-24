import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { mapLocalToCartDto } from '@/src/entities/cart';
import type { BuyNowStore } from './types';

export const useBuyNowStore = create<BuyNowStore>()(
  persist(
    (set, get) => ({
      item: null,

      setBuyNowItem: (product, quantity = 1) => {
        if (product.stock <= 0) return;

        const itemDto = mapLocalToCartDto({
          productId: product.id,
          product,
          quantity,
        });

        set({ item: itemDto });
      },

      updateBuyNowQuantity: (quantity, onError) => {
        const current = get().item;
        if (!current) return;

        const maxStock = current.product.stock;

        if (quantity > maxStock) {
          onError?.(maxStock);
          set({
            item: {
              ...current,
              quantity: maxStock,
              totalPrice: maxStock * current.product.price,
            },
          });
          return;
        }

        const safeQty = Math.max(1, quantity);
        set({
          item: {
            ...current,
            quantity: safeQty,
            totalPrice: safeQty * current.product.price,
          },
        });
      },

      clearBuyNow: () => set({ item: null }),
    }),
    {
      name: 'buy-now-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
