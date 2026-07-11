'use client';

import { ReactNode, isValidElement, cloneElement, ReactElement } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/src/shared/lib';
import type { DropdownProps } from '@/src/shared/ui/dropdown/types';
import { useDropdown } from '@/src/shared/ui/dropdown/use-dropdown';
import s from './dropdown.module.scss';

export const Dropdown = ({
  children,
  trigger,
  open,
  defaultOpen = false,
  onOpenChange,
  containerClassName,
  listClassName,
  closeOnClickOutside = true,
  align = 'left',
  itemAlign = 'left',
  usePortal = false,
}: DropdownProps) => {
  const {
    isOpen,
    toggle,
    containerRef,
    listRef,
    handleTriggerKeyDown,
    handleListKeyDown,
    triggerAria,
  } = useDropdown({
    open,
    defaultOpen,
    onOpenChange,
    closeOnClickOutside,
  });

  let renderedTrigger: ReactNode;

  if (isValidElement(trigger)) {
    const triggerElement = trigger as ReactElement<{
      onClick?: React.MouseEventHandler;
      onKeyDown?: React.KeyboardEventHandler;
    }>;

    // Saving original onClick and onKeyDown
    const originalOnClick = triggerElement.props.onClick;
    const originalOnKeyDown = triggerElement.props.onKeyDown;

    renderedTrigger = cloneElement(triggerElement, {
      ...triggerAria,
      onClick: (e: React.MouseEvent) => {
        originalOnClick?.(e);
        toggle();
      },
      onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => {
        originalOnKeyDown?.(e);
        handleTriggerKeyDown(e);
      },
    });
  } else {
    // If not an element, wrap in a button
    renderedTrigger = (
      <button
        type='button'
        className={s.trigger}
        onClick={toggle}
        onKeyDown={handleTriggerKeyDown}
        {...triggerAria}
      >
        {trigger}
      </button>
    );
  }

  const listContent = isOpen && (
    <ul
      ref={listRef}
      role='listbox'
      aria-label='Dropdown menu'
      className={cn(s.list, listClassName)}
      data-align={align}
      data-item-align={itemAlign}
      onKeyDown={handleListKeyDown}
    >
      {children}
    </ul>
  );

  return (
    <div
      ref={containerRef}
      className={cn(s.dropdown, containerClassName)}
    >
      {renderedTrigger}
      {usePortal && typeof document !== 'undefined'
        ? createPortal(listContent, document.body)
        : listContent}
    </div>
  );
};
