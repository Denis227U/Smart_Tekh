'use client';

import Link from 'next/link';
import { cn } from '@/src/shared/lib';
import type { ButtonAsButtonProps, ButtonProps } from './types';
import s from './button.module.scss';

export const Button = (props: ButtonProps) => {
  const commonProps = {
    className: cn(s.button, props.className),
    'data-variant': props.variant,
  };

  // render Next.js Link
  if ('href' in props && props.href !== undefined) {
    const { href, children, icon, ...rest } = props;
    return (
      <Link
        href={href}
        {...rest}
        {...commonProps}
      >
        {icon && icon}
        {children}
      </Link>
    );
  }

  // render button
  const { children, icon, onClick, ...rest } = props as ButtonAsButtonProps;

  return (
    <button
      onClick={onClick}
      {...rest}
      {...commonProps}
    >
      {icon && icon}
      {children}
    </button>
  );
};
