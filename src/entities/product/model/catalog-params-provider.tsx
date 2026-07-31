'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  PropsWithChildren,
  startTransition,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { useDebouncedCallback } from 'use-debounce';
import {
  type CatalogParams,
  CatalogParamsContext,
} from './catalog-params-context';

/**
 * Context provider for managing catalog filtering, sorting, and pagination parameters via the URL.
 *
 * Provides methods for modifying filters:
 * - `setPriceRange` — Sets the price range and resets the page to 1. Updates the URL using a 400ms debounce without adding a new entry to the browser history.
 * - `setFilter` — Updates filters, except for prices and characteristics. Updates the URL and adds a new entry to the browser history.
 * - `toggleCharacteristic` — Toggles the selected characteristic value within the group. Updates the URL and adds a new entry to the browser history.
 * - `removeCharacteristicGroup` — Completely removes a characteristic group by its name and resets the page to 1. Updates the URL and adds a new entry to the browser history.
 * - `clearAllFilters` — Resets all filters while preserving the current sorting. Updates the URL and adds a new entry to the browser history.
 */
export const CatalogParamsProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentFilters = useMemo((): CatalogParams => {
    return {
      priceMin: searchParams?.get('priceMin')
        ? Number(searchParams.get('priceMin'))
        : '',
      priceMax: searchParams?.get('priceMax')
        ? Number(searchParams.get('priceMax'))
        : '',
      sort: searchParams?.get('sort') ?? 'newest',
      page: searchParams?.get('page') ? Number(searchParams.get('page')) : 1,
      characteristics: (() => {
        const charParam = searchParams?.get('characteristics');
        if (charParam) {
          try {
            return JSON.parse(charParam);
          } catch {
            return [];
          }
        }
        return [];
      })(),
    };
  }, [searchParams]);

  const [localPrices, setLocalPrices] = useState<{
    priceMin: string | number;
    priceMax: string | number;
  }>({
    priceMin: currentFilters.priceMin,
    priceMax: currentFilters.priceMax,
  });

  // Synchronize local prices if the URL has changed externally (e.g. resetting filters)
  const filters = useMemo(() => {
    return {
      ...currentFilters,
      priceMin: localPrices.priceMin,
      priceMax: localPrices.priceMax,
    };
  }, [currentFilters, localPrices]);

  const updateURL = useCallback(
    (
      newFilters: CatalogParams,
      transitionType: 'push' | 'replace' = 'push',
    ) => {
      const params = new URLSearchParams();

      if (newFilters.priceMin !== undefined && newFilters.priceMin !== '')
        params.set('priceMin', String(newFilters.priceMin));
      if (newFilters.priceMax !== undefined && newFilters.priceMax !== '')
        params.set('priceMax', String(newFilters.priceMax));

      if (newFilters.sort !== 'newest') params.set('sort', newFilters.sort);

      if (newFilters.page !== 1) params.set('page', String(newFilters.page));

      if (newFilters.characteristics.length > 0) {
        params.set(
          'characteristics',
          JSON.stringify(newFilters.characteristics),
        );
      }

      if (params.toString() !== searchParams?.toString()) {
        startTransition(() => {
          router[transitionType](`${pathname}?${params.toString()}`, {
            scroll: false,
          });
        });
      }
    },
    [pathname, router, searchParams],
  );

  const debouncedUpdateURL = useDebouncedCallback(
    (newFilters: CatalogParams) => updateURL(newFilters, 'replace'),
    400,
  );

  const setPriceRange = useCallback(
    (min: number | string, max: number | string) => {
      const newFilters = {
        ...filters,
        priceMin: min,
        priceMax: max,
        page: 1,
      };

      setLocalPrices({ priceMin: min, priceMax: max });
      debouncedUpdateURL(newFilters);
    },
    [filters, debouncedUpdateURL],
  );

  const setFilter = useCallback(
    <
      K extends Exclude<
        keyof CatalogParams,
        'priceMin' | 'priceMax' | 'characteristics'
      >,
    >(
      key: K,
      value: CatalogParams[K],
    ) => {
      const newFilters = { ...currentFilters, [key]: value };
      updateURL(newFilters, 'push');
    },
    [currentFilters, updateURL],
  );

  const toggleCharacteristic = useCallback(
    (groupName: string, value: string) => {
      const currentGroup = currentFilters.characteristics.find(
        (c) => c.name === groupName,
      );
      const currentValues = currentGroup?.values ?? [];

      let newCharacteristics = [...currentFilters.characteristics];

      if (currentValues.includes(value)) {
        newCharacteristics = newCharacteristics
          .map((c) =>
            c.name === groupName
              ? { ...c, values: c.values.filter((v) => v !== value) }
              : c,
          )
          .filter((c) => c.values.length > 0);
      } else {
        const groupIndex = newCharacteristics.findIndex(
          (c) => c.name === groupName,
        );
        if (groupIndex >= 0) {
          newCharacteristics[groupIndex] = {
            ...newCharacteristics[groupIndex],
            values: [...newCharacteristics[groupIndex].values, value],
          };
        } else {
          newCharacteristics.push({ name: groupName, values: [value] });
        }
      }

      const newFilters = {
        ...currentFilters,
        characteristics: newCharacteristics,
      };
      updateURL(newFilters, 'push');
    },
    [currentFilters, updateURL],
  );

  const removeCharacteristicGroup = useCallback(
    (groupName: string) => {
      const newCharacteristics = currentFilters.characteristics.filter(
        (c) => c.name !== groupName,
      );

      const newFilters = {
        ...currentFilters,
        characteristics: newCharacteristics,
        page: 1,
      };

      updateURL(newFilters, 'push');
    },
    [currentFilters, updateURL],
  );

  const clearAllFilters = useCallback(() => {
    setLocalPrices({ priceMin: '', priceMax: '' });

    const clearedFilters: CatalogParams = {
      priceMin: '',
      priceMax: '',
      sort: currentFilters.sort,
      page: 1,
      characteristics: [],
    };

    updateURL(clearedFilters, 'push');
  }, [currentFilters.sort, updateURL]);

  const contextValue = useMemo(
    () => ({
      filters,
      setFilter,
      setPriceRange,
      toggleCharacteristic,
      removeCharacteristicGroup,
      clearAllFilters,
    }),
    [
      filters,
      setFilter,
      setPriceRange,
      toggleCharacteristic,
      removeCharacteristicGroup,
      clearAllFilters,
    ],
  );

  return (
    <CatalogParamsContext.Provider value={contextValue}>
      {children}
    </CatalogParamsContext.Provider>
  );
};
