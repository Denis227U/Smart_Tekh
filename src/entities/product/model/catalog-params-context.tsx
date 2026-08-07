'use client';

import { createContext, useContext } from 'react';
import { CharacteristicFilter } from './types';

export interface CatalogParams {
  priceMin: number | string;
  priceMax: number | string;
  characteristics: CharacteristicFilter[];
  sort: string;
  page: number;
}

interface CatalogParamsContextValue {
  filters: CatalogParams;
  setFilter: <
    K extends Exclude<
      keyof CatalogParams,
      'priceMin' | 'priceMax' | 'characteristics'
    >,
  >(
    key: K,
    value: CatalogParams[K],
  ) => void;
  setPriceRange: (min: number | string, max: number | string) => void;
  toggleCharacteristic: (groupName: string, value: string) => void;
  removeCharacteristicGroup: (groupName: string) => void;
  clearAllFilters: () => void;
}

export const CatalogParamsContext = createContext<
  CatalogParamsContextValue | undefined
>(undefined);

export function useCatalogParams() {
  const context = useContext(CatalogParamsContext);
  if (!context) {
    throw new Error(
      'useCatalogParams must be used within a CatalogParamsProvider',
    );
  }
  return context;
}
