'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/src/shared/ui/button';
import { Field } from '@/src/shared/ui/field';
import { Icon } from '@/src/shared/ui/icon';
import { cn } from '@/src/shared/lib';
import type { FieldRevealProps } from './types';
import s from './field-reveal.module.scss';

export const FieldReveal = ({
  linkHref,
  linkText,
  linkClassName,
  linkAlign = 'left',
  className,
  ...fieldProps
}: FieldRevealProps) => {
  const [shown, setShown] = useState(false);
  const toggleShown = () => setShown((prev) => !prev);

  return (
    <div className={cn(s.field, className)}>
      <Field
        type={shown ? 'text' : 'password'}
        placeholder='******'
        {...fieldProps}
        prefix={<Icon name='Lock' />}
        suffix={
          <Button
            type='button'
            onClick={toggleShown}
            aria-label={shown ? 'Скрыть пароль' : 'Показать пароль'}
          >
            <Icon name={shown ? 'Eye' : 'EyeOff'} />
          </Button>
        }
      />
      {linkHref && linkText && (
        <Link
          href={linkHref}
          className={cn(s.link, linkClassName)}
          data-align={linkAlign}
        >
          {linkText}
        </Link>
      )}
    </div>
  );
};
