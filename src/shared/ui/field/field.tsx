'use client';

import { ReactNode, useId } from 'react';
import type {
  FieldCustomProps,
  FieldProps,
  InputFieldProps,
  TextareaFieldProps,
} from './types';
import { FieldLayout } from './field-layout';
import s from './field.module.scss';

export const Field = (props: FieldProps) => {
  const {
    label,
    isRequired = false,
    isVisibleLabel = true,
    className,
    prefix,
    suffix,
    error,
    helperText,
    wrapperAs,
    ...withoutCustomProps
  } = props;

  const id = useId();
  let control: ReactNode;

  if (props.multiline) {
    // textarea props
    const {
      type: _,
      multiline: __,
      ref,
      name,
      ...rest
    } = withoutCustomProps as Omit<TextareaFieldProps, keyof FieldCustomProps>;
    control = (
      <textarea
        ref={ref}
        className={s.control}
        id={id}
        name={name}
        required={isRequired}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...rest}
      />
    );
  } else {
    // input props
    const { ref, type, name, ...rest } = withoutCustomProps as Omit<
      InputFieldProps,
      keyof FieldCustomProps
    >;

    control = (
      <input
        ref={ref}
        type={type ?? 'text'}
        className={s.control}
        id={id}
        name={name}
        required={isRequired}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...rest}
      />
    );
  }

  return (
    <FieldLayout
      id={id}
      className={className}
      wrapperAs={wrapperAs}
      prefix={prefix}
      suffix={suffix}
      control={control}
      error={error}
      helperText={helperText}
      label={label}
      isRequired={isRequired}
      isVisibleLabel={isVisibleLabel}
      styles={s}
    />
  );
};

Field.displayName = 'Field';
