'use client';

import { useCallback, useState } from 'react';
import type { PriceRange } from '@/src/features/product-filter/model/types';
import { PriceRangeSlider } from '@/src/features/product-filter/ui/price-range-filter/price-range-slider';
import { useCatalogParams } from '@/src/entities/product';
import { Heading } from '@/src/shared/ui/common';
import { PRICE_STEP } from '../../model/constants';
import s from './price-range-filter.module.scss';

/**
 * Ancillary component for managing inputs and slider.
 *
 * @param props
 * @param props.queryMin - Current minimum price from the external store/URL.
 * @param props.queryMax - Current maximum price from the external store/URL.
 * @param props.catalogMin - Absolute minimum allowed price boundary.
 * @param props.catalogMax - Absolute maximum allowed price boundary.
 * @param props.onPriceChange - Callback to update the external store price range.
 */
const PriceRangeInputs = ({
  queryMin,
  queryMax,
  catalogMin,
  catalogMax,
  onPriceChange,
}: {
  queryMin: number | string;
  queryMax: number | string;
  catalogMin: number;
  catalogMax: number;
  onPriceChange: (min: number | string, max: number | string) => void;
}) => {
  const targetMinStr = queryMin === '' ? '' : String(queryMin);
  const targetMaxStr = queryMax === '' ? '' : String(queryMax);

  const [state, setState] = useState({
    minInput: targetMinStr,
    maxInput: targetMaxStr,
    prevQueryMin: queryMin,
    prevQueryMax: queryMax,
  });

  // Sync local state with external filters
  if (queryMin !== state.prevQueryMin || queryMax !== state.prevQueryMax) {
    setState({
      minInput: targetMinStr,
      maxInput: targetMaxStr,
      prevQueryMin: queryMin,
      prevQueryMax: queryMax,
    });
  }

  // Calculate slider values from local state to ensure smoothness.
  const sliderValues: [number, number] = [
    state.minInput === ''
      ? catalogMin
      : Math.max(Number(state.minInput), catalogMin),
    state.maxInput === ''
      ? catalogMax
      : Math.min(Number(state.maxInput), catalogMax),
  ];

  const handleRangeChange = useCallback(
    (values: number[]) => {
      const [min, max] = values;
      const nextMinStr = min === catalogMin ? '' : String(min);
      const nextMaxStr = max === catalogMax ? '' : String(max);

      setState((prev) => ({
        ...prev,
        minInput: nextMinStr,
        maxInput: nextMaxStr,
      }));

      onPriceChange(
        min === catalogMin ? '' : min,
        max === catalogMax ? '' : max,
      );
    },
    [catalogMin, catalogMax, onPriceChange],
  );

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setState((prev) => ({ ...prev, minInput: value }));

    if (value === '') {
      onPriceChange('', queryMax);
      return;
    }

    const num = Number(value);
    if (isNaN(num)) return;

    const clamped = Math.max(num, catalogMin);
    onPriceChange(clamped === catalogMin ? '' : clamped, queryMax);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setState((prev) => ({ ...prev, maxInput: value }));

    if (value === '') {
      onPriceChange(queryMin, '');
      return;
    }

    const num = Number(value);
    if (isNaN(num)) return;

    const clamped = Math.min(num, catalogMax);
    onPriceChange(queryMin, clamped === catalogMax ? '' : clamped);
  };

  // Validation on blur or Enter
  const handleApplyNow = () => {
    let finalMin = state.minInput === '' ? catalogMin : Number(state.minInput);
    let finalMax = state.maxInput === '' ? catalogMax : Number(state.maxInput);

    if (finalMin < catalogMin) finalMin = catalogMin;
    if (finalMax > catalogMax) finalMax = catalogMax;

    if (finalMin > finalMax) {
      finalMin = finalMax;
    }

    const nextMinStr = finalMin === catalogMin ? '' : String(finalMin);
    const nextMaxStr = finalMax === catalogMax ? '' : String(finalMax);

    setState((prev) => ({
      ...prev,
      minInput: nextMinStr,
      maxInput: nextMaxStr,
    }));

    onPriceChange(
      finalMin === catalogMin ? '' : finalMin,
      finalMax === catalogMax ? '' : finalMax,
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleApplyNow();
    }
  };

  return (
    <div className={s.wrapper}>
      <div className={s.field}>
        <label
          className={s.label}
          htmlFor='priceMin'
        >
          от
        </label>
        <input
          className={s.input}
          type='number'
          id='priceMin'
          min={catalogMin}
          max={catalogMax}
          step={PRICE_STEP}
          value={state.minInput}
          placeholder={String(catalogMin)}
          onChange={handleMinChange}
          onBlur={handleApplyNow}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className={s.field}>
        <label
          className={s.label}
          htmlFor='priceMax'
        >
          до
        </label>
        <input
          className={s.input}
          type='number'
          id='priceMax'
          min={catalogMin}
          max={catalogMax}
          step={PRICE_STEP}
          value={state.maxInput}
          placeholder={String(catalogMax)}
          onChange={handleMaxChange}
          onBlur={handleApplyNow}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className={s.range}>
        <PriceRangeSlider
          step={PRICE_STEP}
          minPrice={catalogMin}
          maxPrice={catalogMax}
          localValues={sliderValues}
          onRangeChange={handleRangeChange}
        />
      </div>
    </div>
  );
};

export const PriceRangeFilter = ({
  title,
  priceRange,
}: {
  title: string;
  priceRange: PriceRange;
}) => {
  const { filters, setPriceRange } = useCatalogParams();

  return (
    <>
      <Heading
        tag='h2'
        variant='h5'
      >
        {title}
      </Heading>

      <PriceRangeInputs
        queryMin={filters.priceMin}
        queryMax={filters.priceMax}
        catalogMin={priceRange.min}
        catalogMax={priceRange.max}
        onPriceChange={setPriceRange}
      />
    </>
  );
};
