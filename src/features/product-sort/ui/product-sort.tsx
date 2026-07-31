'use client';

import {
  type ProductSort as ProductSortType,
  useCatalogParams,
} from '@/src/entities/product';
import { Select } from '@/src/shared/ui/client';
import { SELECT_OPTIONS } from '../model/constants';

export const ProductSort = () => {
  const { filters, setFilter } = useCatalogParams();

  return (
    <Select
      options={SELECT_OPTIONS}
      value={filters.sort}
      onChange={(val) => setFilter('sort', val as ProductSortType)}
    />
  );
};
