'use client';

import { cn } from '@/src/shared/lib';
import { useTabsContext } from './tabs-context';
import type { TabsTriggerProps } from './types';
import s from './tabs.module.scss';

export const TabsTrigger = ({
  value,
  children,
  className,
  disabled = false,
}: TabsTriggerProps) => {
  const { activeValue, setActiveValue, baseId } =
    useTabsContext('Tabs.Trigger');
  const isActive = activeValue === value;

  const handleClick = () => {
    if (!disabled) {
      setActiveValue(value);
    }
  };

  return (
    <li role='presentation'>
      <button
        className={cn(s.trigger, className)}
        id={`${baseId}-tab-${value}`}
        type='button'
        role='tab'
        data-value={value}
        data-active={isActive || undefined}
        aria-controls={`${baseId}-panel-${value}`}
        aria-selected={isActive}
        aria-disabled={disabled}
        tabIndex={isActive ? 0 : -1}
        onClick={handleClick}
        disabled={disabled}
      >
        {children}
      </button>
    </li>
  );
};
