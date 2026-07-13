'use client';

import Link from 'next/link';
import { cn } from '@/src/shared/lib';
import type { ButtonAsButtonProps, ButtonProps } from './types';
import s from './button.module.scss';

export const Button = (props: ButtonProps) => {
  const { align = 'center' } = props;

  const commonProps = {
    className: cn(s.button, props.className),
    'data-variant': props.variant,
    'data-align': align,
  };

  // render Next.js Link
  if ('href' in props && props.href !== undefined) {
    const { href, children, icon, align: _, ref, ...rest } = props;
    return (
      <Link
        href={href}
        ref={ref}
        {...rest}
        {...commonProps}
      >
        {icon && icon}
        {children}
      </Link>
    );
  }

  // render button
  const {
    children,
    icon,
    onClick,
    align: _,
    ref,
    ...rest
  } = props as ButtonAsButtonProps;

  return (
    <button
      onClick={onClick}
      ref={ref}
      {...rest}
      {...commonProps}
    >
      {icon && icon}
      {children}
    </button>
  );
};
