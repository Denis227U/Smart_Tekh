'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { getFocusableChild } from '@/src/shared/lib/client';

export function useDropdown({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  closeOnClickOutside = true,
  closeOnEscape = true,
}: {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
} = {}) {
  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const shouldFocusFirst = useRef(false);

  const setOpen = useCallback(
    (newOpen: boolean) => {
      if (!isControlled) setInternalOpen(newOpen);
      onOpenChange?.(newOpen);
    },
    [isControlled, onOpenChange],
  );

  const toggle = useCallback(() => setOpen(!isOpen), [isOpen, setOpen]);

  // Close on click outside
  useEffect(() => {
    if (!closeOnClickOutside || !isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, closeOnClickOutside, setOpen]);

  // Manage focus when opening/closing
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;

      if (shouldFocusFirst.current) {
        shouldFocusFirst.current = false;
        // Using requestAnimationFrame instead of setTimeout ensures the list is fully DOM-mounted and focused right before the next paint
        requestAnimationFrame(() => {
          const firstItem =
            listRef.current?.querySelector<HTMLElement>('[role="option"]');
          if (firstItem) {
            const focusTarget = getFocusableChild(firstItem) ?? firstItem;
            focusTarget.focus();
          }
        });
      }
    } else {
      previousActiveElement.current?.focus();
      previousActiveElement.current = null;
    }
  }, [isOpen]);

  const handleTriggerKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (isOpen) {
          setOpen(false);
        } else {
          shouldFocusFirst.current = true;

          setOpen(true);
        }
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (!isOpen) {
          shouldFocusFirst.current = true;
          setOpen(true);
        } else {
          const firstItem =
            listRef.current?.querySelector<HTMLElement>('[role="option"]');
          firstItem?.focus();
        }
      }

      if (e.key === 'Escape' && isOpen && closeOnEscape) {
        setOpen(false);
      }
    },
    [isOpen, setOpen, closeOnEscape],
  );

  // Keyboard navigation within the list
  const handleListKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLUListElement>) => {
      if (e.key === 'Escape') {
        if (closeOnEscape) {
          setOpen(false);
          previousActiveElement.current?.focus();
        }
        return;
      }

      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const items = Array.from(
          listRef.current?.querySelectorAll<HTMLElement>('[role="option"]') ??
            [],
        );
        if (items.length === 0) return;

        const currentIndex = items.findIndex(
          (el) => el === document.activeElement,
        );
        let nextIndex = 0;
        if (e.key === 'ArrowDown') {
          nextIndex =
            currentIndex === -1 ? 0 : (currentIndex + 1) % items.length;
        } else {
          nextIndex =
            currentIndex === -1
              ? items.length - 1
              : (currentIndex - 1 + items.length) % items.length;
        }
        items[nextIndex].focus();
      }
    },
    [setOpen, closeOnEscape],
  );

  const triggerAria = {
    'aria-expanded': isOpen,
    'aria-haspopup': 'listbox' as const,
    'data-active': isOpen,
  };

  return {
    isOpen,
    setOpen,
    toggle,
    containerRef,
    listRef,
    handleTriggerKeyDown,
    handleListKeyDown,
    triggerAria,
  };
}
