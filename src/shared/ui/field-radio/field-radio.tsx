'use client';

import { useId, useState } from 'react';
import { cn } from '@/src/shared/lib';
import type { FieldRadioProps } from './types';
import s from './field-radio.module.scss';

export const FieldRadio = ({
  className,
  options,
  value,
  onChange,
  defaultValue,
  name,
  disabled = false,
  variant = 'card',
  ariaLabelledBy,
  ariaLabel,
  error,
  helperText,
}: FieldRadioProps) => {
  const baseId = useId();

  // state for uncontrolled mode
  const [internalValue, setInternalValue] = useState<string | number | null>(
    defaultValue ?? null,
  );

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleChange = (optionValue: string | number) => {
    if (!isControlled) {
      setInternalValue(optionValue);
    }

    onChange?.(optionValue);
  };

  return (
    <div className={s.wrapper}>
      <div
        className={cn(s.root, className)}
        role='radiogroup'
        data-variant={variant}
        data-error={!!error || undefined}
        aria-labelledby={ariaLabelledBy}
        aria-label={ariaLabel}
      >
        {options.map((option, index) => {
          const isChecked = currentValue === option.value;
          const isOptionDisabled = disabled || option.disabled;
          const inputId = `${baseId}-${index}`;

          return (
            <div
              key={option.value}
              className={cn(s.item, {
                [s.checked]: isChecked,
                [s.disabled]: isOptionDisabled,
              })}
              data-variant={variant}
            >
              <input
                type='radio'
                id={inputId}
                name={name}
                value={option.value}
                checked={isChecked}
                disabled={isOptionDisabled}
                onChange={() => handleChange(option.value)}
                className={cn(s.input, 'visually-hidden')}
              />

              <div
                className={s.circle}
                aria-hidden='true'
              >
                <div className={s.dot} />
              </div>

              <label
                htmlFor={inputId}
                className={s.content}
              >
                {typeof option.label === 'function'
                  ? option.label(isChecked)
                  : option.label}
              </label>
            </div>
          );
        })}
      </div>
      {helperText && (
        <span
          className={s.helper}
          data-error={!!error}
        >
          {helperText}
        </span>
      )}
    </div>
  );
};
