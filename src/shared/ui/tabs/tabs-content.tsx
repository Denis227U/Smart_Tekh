'use client';

import { cn } from '@/src/shared/lib';
import { useTabsContext } from './tabs-context';
import type { TabsContentProps } from './types';
import s from './tabs.module.scss';

export const TabsContent = ({
  value,
  children,
  className,
}: TabsContentProps) => {
  const { activeValue, baseId } = useTabsContext('Tabs.Content');
  const isActive = activeValue === value;

  return (
    <div
      className={cn(s.content, className)}
      id={`${baseId}-panel-${value}`}
      data-active={isActive || undefined}
      aria-labelledby={`${baseId}-tab-${value}`}
      role='tabpanel'
      style={{ display: isActive ? undefined : 'none' }}
    >
      {children}
    </div>
  );
};
