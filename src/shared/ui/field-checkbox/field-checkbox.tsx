'use client';

import Link from 'next/link';
import { forwardRef } from 'react';
import { cn } from '@/src/shared/lib';
import type { CheckboxProps } from './types';
import s from './field-checkbox.module.scss';

export const FieldCheckbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, text, link, checked, defaultChecked, ...rest }, ref) => {
    // Prevent checkbox toggle on link click
    const suppressLinkToggle = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.stopPropagation();
    };

    const isExternal = link?.isExternal ?? true;

    return (
      <label className={cn(s.checkbox, className)}>
        <input
          ref={ref}
          className={s.control}
          type='checkbox'
          checked={checked}
          defaultChecked={defaultChecked}
          {...rest}
        />
        <span className={s.label}>
          {text}
          {link && (
            <Link
              href={link.href}
              className={s.link}
              onClick={suppressLinkToggle}
              target={isExternal ? '_blank' : undefined}
              // For security when using target="_blank"
              rel={isExternal ? 'noopener noreferrer' : undefined}
            >
              {link.label}
            </Link>
          )}
        </span>
      </label>
    );
  },
);

FieldCheckbox.displayName = 'FieldCheckbox';
