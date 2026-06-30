'use client';

import Link from 'next/link';
import { ButtonProps, TButtonProps } from './button.types';
import { cn } from '@/src/shared/lib';
import s from './button.module.scss';

export const Button = (props: TButtonProps) => {
  const commonProps = {
    className: cn(s.button, props.className),
    'data-variant': props.variant,
  };

  // render Next.js Link
  if ('href' in props && props.href !== undefined) {
    const { href, children, icon, ...rest } = props;
    return (
      <Link href={href} {...rest} {...commonProps}>
        {icon && icon}
        {children}
      </Link>
    );
  }

  // render button
  const { children, icon, onClick, ...rest } = props as ButtonProps;

  return (
    <button {...rest} onClick={onClick} {...commonProps}>
      {icon && icon}
      {children}
    </button>
  );
};
