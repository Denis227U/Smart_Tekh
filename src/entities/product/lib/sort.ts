import { VALID_SORT_VALUES } from '../model/constants';
import type { ProductSort } from '../model/types';

/**
 * Type guard to validate the product sorting parameter
 */
export const isValidSort = (value: unknown): value is ProductSort => {
  return (
    typeof value === 'string' &&
    VALID_SORT_VALUES.includes(value as ProductSort)
  );
};
