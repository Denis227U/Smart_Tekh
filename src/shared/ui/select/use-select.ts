import {
  KeyboardEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import type { Option, SelectProps } from './types';

/**
 * Custom hook for managing the state and accessibility (A11y) of a custom select component.
 * Supports keyboard navigation, cyclical cycling through options, closing on click outside/Escape,
 * and a hybrid operational mode (controlled / uncontrolled).
 *
 * @param {Pick<SelectProps, 'options' | 'value' | 'onChange' | 'defaultValue' | 'disabled' | 'isClearable'>} props - The select configuration parameters.
 * @returns An object containing state, refs, and event handlers.
 */
export const useSelect = ({
  options,
  value,
  onChange,
  defaultValue,
  disabled = false,
  isClearable = false,
}: Pick<
  SelectProps,
  'options' | 'value' | 'onChange' | 'defaultValue' | 'disabled' | 'isClearable'
>) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const id = useId();
  const labelId = `${id}-label`;

  // Internal state for uncontrolled mode
  const [internalValue, setInternalValue] = useState<typeof defaultValue>(
    defaultValue ?? null,
  );

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const selectedOption =
    options.find((opt) => opt.value === currentValue) ?? null;

  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggle = useCallback(() => {
    if (disabled) return;

    setIsOpen((prev) => {
      const nextOpen = !prev;

      if (nextOpen) {
        const selectedIndex = options.findIndex(
          (opt) => opt.value === currentValue,
        );
        if (selectedIndex !== -1 && !options[selectedIndex].disabled) {
          setHighlightedIndex(selectedIndex);
        } else {
          const firstActive = options.findIndex((opt) => !opt.disabled);
          setHighlightedIndex(firstActive !== -1 ? firstActive : 0);
        }
      }

      return nextOpen;
    });
  }, [disabled, options, currentValue]);

  const selectOption = useCallback(
    (option: Option) => {
      if (option.disabled) return;
      if (isControlled) {
        onChange?.(option.value);
      } else {
        setInternalValue(option.value);
        onChange?.(option.value);
      }
      close();
    },
    [onChange, close, isControlled],
  );

  const clearValue = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!isClearable || disabled) return;

      if (isControlled) {
        onChange?.(null);
      } else {
        setInternalValue(null);
        onChange?.(null);
      }
    },
    [isClearable, disabled, onChange, isControlled],
  );

  // Close when clicking outside the component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [close]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [close]);

  // Keyboard list navigation (skipping disabled elements)
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;

    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        const selectedIndex = options.findIndex(
          (opt) => opt.value === currentValue,
        );
        if (selectedIndex !== -1 && !options[selectedIndex].disabled) {
          setHighlightedIndex(selectedIndex);
        } else {
          const firstActive = options.findIndex((opt) => !opt.disabled);
          setHighlightedIndex(firstActive !== -1 ? firstActive : 0);
        }
        return;
      }

      const direction = e.key === 'ArrowDown' ? 1 : -1;
      let nextIndex = highlightedIndex + direction;

      while (nextIndex >= 0 && nextIndex < options.length) {
        if (!options[nextIndex].disabled) {
          setHighlightedIndex(nextIndex);
          listRef.current
            ?.querySelectorAll('li')
            [nextIndex]?.scrollIntoView({ block: 'nearest' });
          break;
        }
        nextIndex += direction;
      }
    }

    if (e.key === 'Enter' && isOpen) {
      e.preventDefault();
      const option = options[highlightedIndex];
      if (option && !option.disabled) {
        selectOption(option);
      }
    }

    if (e.key === 'Tab') {
      close();
    }
  };

  return {
    id,
    containerRef,
    labelId,
    selectedOption,
    isOpen,
    listRef,
    highlightedIndex,
    currentValue,
    toggle,
    clearValue,
    handleKeyDown,
    selectOption,
    setHighlightedIndex,
  };
};
