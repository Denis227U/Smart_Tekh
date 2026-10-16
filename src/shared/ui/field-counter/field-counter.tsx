'use client';

import { ChangeEvent, useId } from 'react';
import { cn } from '@/src/shared/lib';
import s from './field-counter.module.scss';

export const FieldCounter = ({
  className,
  count,
  min = 1,
  max = 99,
  onDecrementAction,
  onIncrementAction,
  onInputChangeAction,
}: {
  className?: string;
  count: number;
  min?: number;
  max?: number;
  onDecrementAction: (e: React.MouseEvent) => void;
  onIncrementAction: (e: React.MouseEvent) => void;
  onInputChangeAction: (value: number) => void;
}) => {
  const id = useId();
  const fieldId = `${id}-field`;
  const inputId = `${id}-input`;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      onInputChangeAction(value);
    }
  };

  return (
    <div
      className={cn(s.wrapper, className)}
      role='group'
      aria-labelledby={fieldId}
    >
      <h3
        id={fieldId}
        className='visually-hidden'
      >
        Количество товара
      </h3>

      <button
        type='button'
        className={cn(s.button, s.buttonMinus)}
        aria-controls={inputId}
        title='Уменьшить количество'
        aria-label='Уменьшить количество'
        onClick={onDecrementAction}
        disabled={count <= min}
      >
        -
      </button>
      <input
        id={inputId}
        className={s.field}
        type='number'
        name='product-count'
        value={count}
        min='1'
        max='99'
        step='1'
        inputMode='numeric'
        aria-live='polite'
        aria-label='Текущее количество'
        onChange={handleInputChange}
      />
      <button
        type='button'
        className={cn(s.button, s.buttonPlus)}
        aria-controls={inputId}
        title='Увеличить количество'
        aria-label='Увеличить количество'
        onClick={onIncrementAction}
        disabled={count >= max}
      >
        +
      </button>
    </div>
  );
};
