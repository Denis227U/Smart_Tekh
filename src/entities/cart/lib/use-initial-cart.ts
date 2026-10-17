'use client';

import { useEffect, useRef } from 'react';
import { useCartInitialized } from '@/src/entities/cart/model/actions';
import { getCartProducts } from '../api/get-cart-products';
import { mapLocalToCartDto } from '../lib/map-to-cart-dto';
import { useCartStore } from '../model/store';
import { useCartHydrated } from '../model/use-cart-hydrated';
import type { CartItemDto, LocalCartItem } from '../model/types';

/**
 * A custom React hook for end-to-end cart initialization and synchronization.
 * Handles state restoration, "rehydrating" local data, and merging carts upon user authentication.
 *
 * @description
 * Handles three key scenarios:
 * 1. **Guest Session:** Retrieves flat product IDs from `localStorage` and enriches them with up-to-date product data (price, stock, etc.) via the API.
 * 2. **First Login (Merge):** Detects items added by the user prior to authentication and merges (`isMerge: true`) them with the server-side cart.
 * 3. **Page Reload or Authorized User Returning:** Synchronizes the current session with the server without duplicating items or resurrecting deleted ones.
 *
 * Prevents multiple redundant API calls (race conditions) during rendering by atomically tracking the `userId` using a `useRef`.
 *
 * @param userId - The unique identifier of the authenticated user. If `undefined`, the cart initializes in guest mode.
 *
 * @example
 * // Usage inside CartProvider
 * const { user, isLoading } = useSession();
 * useInitialCart(isLoading ? undefined : user?.id);
 *
 * @returns The hook manages the Zustand store state atomically via side effects and does not return any values.
 */
export const useInitialCart = (userId?: string): void => {
  const isHydrated = useCartHydrated();
  const cartInitialized = useCartInitialized();

  const lastInitializedUserId = useRef<string | undefined>('init');

  useEffect(() => {
    if (!isHydrated) return;

    // Deduplication check: verify if this userId has already been processed.
    if (lastInitializedUserId.current === userId) return;

    const initCart = async () => {
      // Mark current userId as processed
      lastInitializedUserId.current = userId;

      // Inside useEffect to prevent the hook from re-running on every useCartStore change
      const { items, setItems, flushSync } = useCartStore.getState();

      cartInitialized(false);

      try {
        if (userId) {
          const hasMergedInThisSession = sessionStorage.getItem(
            `cart_merged_${userId}`,
          );

          let guestItems: LocalCartItem[] = [];

          try {
            const rawStorage = localStorage.getItem('cart_storage');
            if (rawStorage) {
              const parsed = JSON.parse(rawStorage);
              if (parsed?.state?.items) {
                guestItems = parsed.state.items;
              }
            }
          } catch (e) {
            console.error('Ошибка чтения localStorage:', e);
          }

          const finalLocalItems = guestItems.length > 0 ? guestItems : items;

          if (!hasMergedInThisSession && finalLocalItems.length > 0) {
            // SCENARIO 2: First Login (Merge)
            // User transitioned from guest to authenticated.
            // Merge the local cart with the server cart.
            // Call flushSync with the isMerge = true flag

            if (items.length === 0 && guestItems.length > 0) {
              const partialItems = guestItems.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
                product: undefined,
                totalPrice: 0,
              })) as unknown as CartItemDto[];

              setItems(partialItems);
            }

            sessionStorage.setItem(`cart_merged_${userId}`, 'true');
            await flushSync(userId, true);
          } else {
            // SCENARIO 3: Page Reload or Authorized User Returning
            // Server cart is the single source of truth.
            // Server cart replaces the local cart.

            await flushSync(userId, false);
          }
        } else {
          // SCENARIO 1: Guest Session
          // Modify the local cart only
          // Enrich flat items from localStorage with up-to-date product data

          if (items.length > 0 && !items[0].product) {
            const flatItems = items as unknown as {
              productId: string;
              quantity: number;
            }[];
            const productIds = flatItems.map((i) => i.productId);

            const res = await getCartProducts(productIds);

            if (res.success && res.products) {
              const enrichedItems = flatItems
                .map((item) => {
                  const currentProduct = res.products!.find(
                    (p) => p.id === item.productId,
                  );

                  if (!currentProduct) return null;

                  const validatedQuantity = Math.min(
                    item.quantity,
                    currentProduct.stock,
                  );
                  if (validatedQuantity <= 0) return null;

                  return mapLocalToCartDto({
                    productId: item.productId,
                    quantity: validatedQuantity,
                    product: currentProduct,
                  });
                })
                .filter(Boolean);
              setItems(enrichedItems as CartItemDto[]);
            }
          }
        }
      } catch (error) {
        console.error('Ошибка во время инициализации корзины:', error);
      } finally {
        cartInitialized(true);
      }
    };

    initCart();
  }, [isHydrated, userId, cartInitialized]);
};
