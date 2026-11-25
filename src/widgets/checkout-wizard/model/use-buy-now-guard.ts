'use client';

import { useEffect, useState } from 'react';
import { ROUTES } from '@/src/shared/routes';

/**
 * Manages edge-case transitions and guards on the checkout page.
 *
 * isRedirecting — empty "Buy Now" guard. If the user opens `/checkout?mode=buy-now` via
 * a direct link or reloads the page with an empty buy-now store, silently strips the query parameter
 * via `window.history.replaceState` to fall back to the standard cart checkout.
 *
 * isOrderCompleted — post-order transition. Prevents false triggering of `isRedirecting`
 * when stores are cleared and keeps the loading state active until Next.js finishes navigating
 * to the order details page.
 *
 * @param params - State parameters of the active checkout items source.
 * @returns Transition flags (`isRedirecting`, `isOrderCompleted`) and the `completeOrder` trigger.
 */
export const useBuyNowGuard = ({
  isReady,
  isBuyNow,
  totalCount,
}: {
  isReady: boolean;
  isBuyNow: boolean;
  totalCount: number;
}) => {
  const [isOrderCompleted, setIsOrderCompleted] = useState(false);

  const isRedirecting =
    isReady && isBuyNow && totalCount === 0 && !isOrderCompleted;

  useEffect(() => {
    if (isRedirecting) {
      window.history.replaceState(null, '', ROUTES.CHECKOUT());
    }
  }, [isRedirecting]);

  return {
    isRedirecting,
    isOrderCompleted,
    completeOrder: () => setIsOrderCompleted(true),
  };
};
