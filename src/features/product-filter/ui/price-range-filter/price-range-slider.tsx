import { getTrackBackground, Range } from 'react-range';
import { cn } from '@/src/shared/lib';
import s from './price-range-filter.module.scss';

export const PriceRangeSlider = ({
  step,
  minPrice,
  maxPrice,
  localValues,
  onRangeChange,
}: {
  step: number;
  minPrice: number;
  maxPrice: number;
  localValues: [number, number];
  onRangeChange: (values: number[]) => void;
}) => {
  return (
    <Range
      step={step}
      min={minPrice}
      max={maxPrice}
      values={localValues}
      onChange={onRangeChange}
      renderTrack={({ props, children }) => (
        <div
          onMouseDown={props.onMouseDown}
          onTouchStart={props.onTouchStart}
          className={s.trackWrapper}
          style={props.style}
        >
          <div
            ref={props.ref}
            className={s.trackLine}
            style={{
              background: getTrackBackground({
                values: localValues,
                colors: [
                  'var(--color-gray-40)',
                  'var(--color-blue-50)',
                  'var(--color-gray-40)',
                ],
                min: minPrice,
                max: maxPrice,
              }),
            }}
          >
            {children}
          </div>
        </div>
      )}
      renderThumb={({ props, isDragged }) => {
        const { key, ...restProps } = props;
        return (
          <div
            key={key}
            {...restProps}
            className={cn(s.thumb, isDragged && s.isDragged)}
            style={props.style}
          />
        );
      }}
    />
  );
};
