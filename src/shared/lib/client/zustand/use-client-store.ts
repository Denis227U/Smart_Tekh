'use client';

import { useSyncExternalStore } from 'react';

interface StoreWithApi<T> {
  getState: () => T;
  subscribe: (listener: (state: T, prevState: T) => void) => () => void;
}

/**
 * A custom hook for safely extracting data from a Zustand store within Next.js Client Components.
 * Prevents Next.js hydration mismatch errors by returning the `serverValue` during SSR
 * and switching to the actual client-side store state once the component mounts.
 *
 * @template T The full state type of your Zustand store.
 * @template F The return type of the selector function (the selected state slice).
 *
 * @param useStore The Zustand store instance (or store hook with API methods).
 * @param selector A selector function to extract a specific value from the store state.
 * @param serverValue The fallback default value used during SSR to ensure HTML markup matches.
 *
 * @returns The up-to-date client-side store value, or the `serverValue` when rendering on the server.
 *
 * @example
 * const cartItems = useClientStore(useCartStore, (s) => s.items, []);
 */
export function useClientStore<T, F>(
  useStore: StoreWithApi<T>,
  selector: (state: T) => F,
  serverValue: F,
) {
  return useSyncExternalStore(
    useStore.subscribe,
    () => selector(useStore.getState()),
    () => serverValue,
  );
}
