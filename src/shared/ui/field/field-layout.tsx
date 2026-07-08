'use client';

import { cn } from '@/src/shared/lib';
import type { FieldLayoutProps } from './types';

export const FieldLayout = ({
  id,
  className,
  wrapperAs: Wrapper = 'div',
  prefix,
  suffix,
  control,
  error,
  helperText,
  multiline,
  label,
  isRequired,
  isVisibleLabel,
  styles: s,
}: FieldLayoutProps) => {
  return (
    <Wrapper
      className={cn(s.field, className)}
      data-prefix={!!prefix || undefined}
      data-suffix={!!suffix || undefined}
      data-textarea={!!multiline || undefined}
      data-error={!!error || undefined}
    >
      {label && (
        <label
          className={cn(s.label, !isVisibleLabel && 'visually-hidden')}
          htmlFor={id}
        >
          {label}
          {isRequired && (
            <>
              <span
                className={s.required}
                aria-hidden='true'
              >
                &nbsp;*
              </span>
              <span className='visually-hidden'>(обязательное поле)</span>
            </>
          )}
        </label>
      )}

      <div className={s.wrapper}>
        {prefix && (
          <span
            className={s.prefix}
            aria-hidden='true'
          >
            {prefix}
          </span>
        )}
        {control}
        {suffix && <span className={s.suffix}>{suffix}</span>}
      </div>

      {error && (
        <p
          id={`${id}-error`}
          className={s.error}
          role='alert'
        >
          {helperText}
        </p>
      )}
    </Wrapper>
  );
};
