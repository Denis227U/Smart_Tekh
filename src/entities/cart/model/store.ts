import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { syncCart } from '../api/sync-cart';
import { mapLocalToCartDto } from '../lib/map-to-cart-dto';
import { SYNC_DELAY } from './constants';
import type { CartItemDto, CartStore, LocalCartItem } from './types';

type PersistedCartState = {
  items: LocalCartItem[];
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => {
      // Function that schedules a server sync after SYNC_DELAY
      const scheduleSync = (userId?: string) => {
        if (!userId) return;

        const currentTimeoutId = get()._syncTimeoutId;
        if (currentTimeoutId) {
          clearTimeout(currentTimeoutId);
        }

        const timeoutId = setTimeout(async () => {
          set({ _syncTimeoutId: null });
          await get().flushSync(userId);
        }, SYNC_DELAY);

        set({ _syncTimeoutId: timeoutId });
      };

      return {
        items: [],
        _syncTimeoutId: null,
        isCartInitialized: false,

        addItem: (productDto, productId, userId, onError) => {
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
          scheduleSync(userId);
        },

        updateQuantity: (productId, quantity, userId, onError) => {
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
              scheduleSync(userId);
              return;
            }
          }

          const newItems = items.map((item) =>
            item.productId === productId
              ? { ...item, quantity, totalPrice: quantity * item.product.price }
              : item,
          );
          set({ items: newItems });
          scheduleSync(userId);
        },

        removeItem: async (productId, userId, onError) => {
          const currentTimeoutId = get()._syncTimeoutId;
          if (currentTimeoutId) {
            clearTimeout(currentTimeoutId);
            set({ _syncTimeoutId: null });
          }

          // Optimistic delete
          const previousItems = get().items;
          const newItems = previousItems.filter(
            (item) => item.productId !== productId,
          );
          set({ items: newItems });

          // Server synchronization
          if (userId) {
            try {
              const payload: LocalCartItem[] = newItems.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
              }));

              const res = await syncCart(userId, payload, false);

              if ('error' in res) {
                throw new Error(res.error || 'Ошибка сервера');
              }

              // Update state.items with fresh data
              if ('items' in res && res.items) {
                set({ items: res.items });
              }
            } catch (error) {
              console.error('Не удалось удалить товар на сервере:', error);

              // Rollback
              set({ items: previousItems });

              onError?.(
                error instanceof Error
                  ? error.message
                  : 'Не удалось удалить товар. Проверьте подключение к интернету.',
              );
            }
          }
        },

        clearCart: () => {
          const currentTimeoutId = get()._syncTimeoutId;
          if (currentTimeoutId) {
            clearTimeout(currentTimeoutId);
          }
          set({ items: [], _syncTimeoutId: null });
        },

        flushSync: async (userId, isMerge = false) => {
          const { items, _syncTimeoutId } = get();

          if (_syncTimeoutId) {
            clearTimeout(_syncTimeoutId);
            set({ _syncTimeoutId: null });
          }

          const payload: LocalCartItem[] = items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          }));

          const res = await syncCart(userId, payload, isMerge);

          // Update state.items with fresh data
          if (res.success && 'items' in res && res.items) {
            set({ items: res.items });
          }
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
