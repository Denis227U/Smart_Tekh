import { cn } from '@/src/shared/lib';
import { Button } from '@/src/shared/ui/client';
import type { PropsWithChildren } from 'react';
import s from './badge.module.scss';

export const Badge = ({
  href,
  label,
  children,
  count = 0,
  className,
}: PropsWithChildren<{
  href: string;
  label: string;
  count: number;
  className?: string;
}>) => {
  return (
    <Button
      className={cn(s.badge, className)}
      data-active={count > 0 ? true : undefined}
      href={href}
      title={label}
      aria-label={label}
    >
      {children}

      {count > 0 && <span className={s.counter}>{count}</span>}
    </Button>
  );
};
