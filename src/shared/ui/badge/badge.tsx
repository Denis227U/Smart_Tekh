import { cn } from '@/src/shared/lib';
import { Button } from '@/src/shared/ui/button';
import { Counter } from '@/src/shared/ui/counter';
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
  if (href) {
    return (
      <Button
        className={cn(s.badgeWrapper, className)}
        href={href}
        title={label}
        aria-label={label}
      >
        <div className={s.iconContainer}>
          {children}
          <Counter
            count={count}
            className={s.badgeCounter}
          />
        </div>
      </Button>
    );
  }

  return (
    <div className={cn(s.iconContainer, className)}>
      {children}
      <Counter
        count={count}
        className={s.badgeCounter}
      />
    </div>
  );
};
