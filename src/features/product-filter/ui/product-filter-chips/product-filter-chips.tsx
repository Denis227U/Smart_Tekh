'use client';

import { useCatalogParams } from '@/src/entities/product';
import s from './product-filter-chips.module.scss';

const ActiveChip = ({
  name,
  value,
  onClose,
}: {
  name: string;
  value: string;
  onClose: () => void;
}) => {
  const title = `${name}: ${value}`;
  return (
    <li
      className={s.item}
      title={title}
    >
      <span className={s.itemName}>{name}:</span>
      <span className={s.itemValues}>{value}</span>
      <button
        className={s.closeBtn}
        onClick={onClose}
        aria-label={`Удалить фильтр ${name}: ${value}`}
      >
        &times;
      </button>
    </li>
  );
};

export const ProductFilterChips = () => {
  const { filters, setPriceRange, removeCharacteristicGroup, clearAllFilters } =
    useCatalogParams();

  const hasActiveCharacteristics = filters.characteristics.length > 0;
  const hasPriceMin = filters.priceMin !== undefined && filters.priceMin !== '';
  const hasPriceMax = filters.priceMax !== undefined && filters.priceMax !== '';
  const hasActiveFilters =
    hasActiveCharacteristics || hasPriceMin || hasPriceMax;

  if (!hasActiveFilters) return null;

  return (
    <div
      className={s.wrapper}
      aria-label='Активные фильтры'
    >
      <ul className={s.list}>
        {hasPriceMin && (
          <ActiveChip
            name='Цена от'
            value={`${filters.priceMin} ₽`}
            onClose={() => setPriceRange('', filters.priceMax)}
          />
        )}

        {hasPriceMax && (
          <ActiveChip
            name='Цена до'
            value={`${filters.priceMax} ₽`}
            onClose={() => setPriceRange(filters.priceMin, '')}
          />
        )}

        {filters.characteristics.map((group) => (
          <ActiveChip
            key={group.name}
            name={group.name}
            value={group.values.join(', ')}
            onClose={() => removeCharacteristicGroup(group.name)}
          />
        ))}
      </ul>
      <button
        className={s.resetAllBtn}
        onClick={clearAllFilters}
        aria-label='Сбросить все фильтры'
      >
        Очистить все
      </button>
    </div>
  );
};
