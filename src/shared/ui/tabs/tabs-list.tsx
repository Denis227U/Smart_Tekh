'use client';

import { KeyboardEvent, useRef } from 'react';
import { cn } from '@/src/shared/lib';
import { useTabsContext } from './tabs-context';
import type { TabsListProps } from './types';
import s from './tabs.module.scss';

export const TabsList = ({ children, className }: TabsListProps) => {
  const { activeValue, setActiveValue, orientation } =
    useTabsContext('Tabs.List');
  const listRef = useRef<HTMLUListElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    if (!listRef.current) return;

    // Find all non-disabled tab buttons (triggers)
    const tabs = Array.from(
      listRef.current.querySelectorAll<HTMLButtonElement>(
        '[role="tab"]:not([disabled])',
      ),
    );
    if (tabs.length === 0) return;

    const currentIndex = tabs.findIndex(
      (tab) => tab.dataset.value === String(activeValue),
    );
    if (currentIndex === -1) return;

    let newIndex = currentIndex;
    const lastIndex = tabs.length - 1;

    if (orientation === 'horizontal') {
      if (e.key === 'ArrowLeft')
        newIndex = currentIndex - 1 < 0 ? lastIndex : currentIndex - 1;
      if (e.key === 'ArrowRight')
        newIndex = currentIndex + 1 > lastIndex ? 0 : currentIndex + 1;
    } else {
      if (e.key === 'ArrowUp')
        newIndex = currentIndex - 1 < 0 ? lastIndex : currentIndex - 1;
      if (e.key === 'ArrowDown')
        newIndex = currentIndex + 1 > lastIndex ? 0 : currentIndex + 1;
    }

    if (e.key === 'Home') {
      newIndex = 0;
    } else if (e.key === 'End') {
      newIndex = lastIndex;
    }

    if (newIndex !== currentIndex) {
      e.preventDefault();
      const targetTab = tabs[newIndex];

      const newValue = targetTab.getAttribute('data-value');
      if (newValue) {
        setActiveValue(newValue);
        targetTab.focus();
      }
    }
  };

  return (
    <ul
      ref={listRef}
      className={cn(s.list, className)}
      role='tablist'
      aria-orientation={orientation}
      onKeyDown={handleKeyDown}
    >
      {children}
    </ul>
  );
};
