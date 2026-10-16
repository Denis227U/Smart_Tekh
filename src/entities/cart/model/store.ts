import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mapLocalToCartDto } from '../lib/map-to-cart-dto';
import type { CartItemDto, CartStore, LocalCartItem } from './types';

type PersistedCartState = {
  items: LocalCartItem[];
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => {
      return {
        items: [],
        isCartInitialized: false,

        addItem: (productDto, productId, onError) => {
          const { items } = get();
          const existing = items.find((item) => item.productId === productId);
          const maxStock = productDto.stock ?? 0;

          let newItems: CartItemDto[];

          if (existing) {
            const nextQty = existing.quantity + 1;

            // Abort if stock exceeded
            if (nextQty > maxStock) {
              onError?.(maxStock);
              return;
            }

            newItems = items.map((i) => {
              if (i.productId === productId) {
                return {
                  ...i,
                  quantity: nextQty,
                  totalPrice: nextQty * i.product.price,
                };
              }
              return i;
            });
          } else {
            // Abort if stock is insufficient (min 1 unit)
            if (maxStock < 1) {
              onError?.(maxStock);
              return;
            }

            newItems = [
              ...items,
              mapLocalToCartDto({
                productId,
                product: productDto,
                quantity: 1,
              }),
            ];
          }

          set({ items: newItems });
        },

        updateQuantity: (productId, quantity, onError) => {
          if (quantity <= 0) {
            get().removeItem(productId);
            return;
          }

          const { items } = get();
          const targetItem = items.find((item) => item.productId === productId);

          if (targetItem) {
            const maxStock = targetItem.product?.stock ?? 0;

            if (quantity > maxStock) {
              onError?.(maxStock);

              // Reset input to max stock
              const fallbackItems = items.map((item) =>
                item.productId === productId
                  ? {
                      ...item,
                      quantity: maxStock,
                      totalPrice: maxStock * item.product.price,
                    }
                  : item,
              );
              set({ items: fallbackItems });
              return;
            }
          }

          const newItems = items.map((item) =>
            item.productId === productId
              ? { ...item, quantity, totalPrice: quantity * item.product.price }
              : item,
          );
          set({ items: newItems });
        },

        removeItem: (productId) => {
          const { items } = get();
          const newItems = items.filter((item) => item.productId !== productId);
          set({ items: newItems });
        },

        clearCart: () => {
          set({ items: [] });
        },

        setItems: (items) => set({ items }),

        setCartInitialized: (initialized) =>
          set({ isCartInitialized: initialized }),
      };
    },
    {
      name: 'cart-storage',
      partialize: (state): PersistedCartState => ({
        items: state.items.map((i) => ({
          productId: i.productId,
          quantity: i.quantity,
        })),
      }),
    },
  ),
);
