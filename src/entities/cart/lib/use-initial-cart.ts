'use client';

import { useEffect, useRef } from 'react';
import { useCartInitialized } from '@/src/entities/cart/model/actions';
import { getCartProducts } from '../api/get-cart-products';
import { mapLocalToCartDto } from '../lib/map-to-cart-dto';
import { useCartStore } from '../model/store';
import { useCartHydrated } from '../model/use-cart-hydrated';
import type { CartItemDto } from '../model/types';

/**
 * A custom React hook for client-side cart initialization.
 * Enriches flat product data from `localStorage` with fresh price and stock data from the server.
 *
 * Prevents multiple redundant API calls (race conditions) during rendering using a ref flag.
 */
export const useInitialCart = () => {
  const isHydrated = useCartHydrated();
  const cartInitialized = useCartInitialized();

  const isProcessing = useRef(false);

  useEffect(() => {
    if (!isHydrated || isProcessing.current) return;

    const initCart = async () => {
      isProcessing.current = true;

      // Inside useEffect to prevent the hook from re-running on every useCartStore change
      const { items, setItems } = useCartStore.getState();

      cartInitialized(false);

      if (items.length === 0) {
        cartInitialized(true);
        return;
      }

      try {
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
      } catch (error) {
        console.error('Ошибка во время инициализации корзины:', error);
      } finally {
        cartInitialized(true);
      }
    };

    initCart();
  }, [isHydrated, cartInitialized]);
};
