'use client';

import { useSyncExternalStore } from 'react';
import { UseBoundStore, StoreApi } from 'zustand';

type PersistStore<T = unknown> = UseBoundStore<StoreApi<T>> & {
  persist: {
    hasHydrated: () => boolean;
    onFinishHydration: (fn: () => void) => () => void;
  };
};

/**
 * A custom hook to track the hydration status of a persistent Zustand store (`zustand/persist`).
 * Safely handles SSR/SSG environments in Next.js App Router by ensuring initial HTML consistency.
 *
 * @template T The full state type of the store utilizing the `persist` middleware.
 *
 * @param store The Zustand store instance that includes the `persist` configuration API.
 *
 * @returns Returns `true` once the store has been successfully hydrated on the client side.
 * Always returns `false` during server-side rendering (SSR).
 *
 * @example
 * const isHydrated = useStoreHydration(useAuthStore);
 * if (!isHydrated) return <Spinner />;
 */
export const useStoreHydration = <T>(store: PersistStore<T>): boolean => {
  return useSyncExternalStore(
    (callback) => {
      if (!store?.persist) return () => {};
      return store.persist.onFinishHydration(callback);
    },
    () => {
      if (!store?.persist) return false;
      return store.persist.hasHydrated();
    },
    () => false,
  );
};
