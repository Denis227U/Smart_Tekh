import type { SelectSortOption } from './types';

export const SELECT_OPTIONS: readonly SelectSortOption[] = [
  { value: 'newest', label: 'Новинки' },
  { value: 'price_asc', label: 'Сначала дешевле' },
  { value: 'price_desc', label: 'Сначала дороже' },
  { value: 'rating', label: 'По рейтингу' },
  { value: 'popular', label: 'Популярные' },
];
