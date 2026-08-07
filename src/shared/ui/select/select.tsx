'use client';

import { cn } from '@/src/shared/lib';
import { Icon } from '@/src/shared/ui/common';
import type { SelectProps } from '@/src/shared/ui/select/types';
import { useSelect } from '@/src/shared/ui/select/use-select';
import s from './select.module.scss';

export const Select = (props: SelectProps) => {
  const {
    options,
    value,
    onChange,
    defaultValue,
    placeholder = 'Выберите...',
    disabled = false,
    isClearable = false,
    className,
    label,
    name,
    error,
    helperText,
  } = props;

  const {
    id,
    containerRef,
    listRef,
    labelId,
    currentValue,
    selectedOption,
    isOpen,
    highlightedIndex,
    toggle,
    clearValue,
    handleKeyDown,
    selectOption,
    setHighlightedIndex,
  } = useSelect({
    options,
    value,
    onChange,
    defaultValue,
    disabled,
    isClearable,
  });

  return (
    <div
      className={cn(s.select, className)}
      ref={containerRef}
      onKeyDown={handleKeyDown}
    >
      {label && (
        <label
          id={labelId}
          htmlFor={id}
          className={s.label}
        >
          {label}
        </label>
      )}

      <div>
        <button
          id={id}
          type='button'
          className={s.trigger}
          data-open={isOpen || undefined}
          data-disabled={disabled || undefined}
          data-error={error || undefined}
          onClick={toggle}
          disabled={disabled}
          aria-haspopup='listbox'
          aria-expanded={isOpen}
          aria-labelledby={label ? labelId : undefined}
        >
          <span
            className={selectedOption ? s.selectedValue : s.selectedplaceholder}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <Icon
            name='ArrowRight'
            width={13}
            height={8}
            aria-hidden='true'
          />
        </button>

        {isClearable && selectedOption && !disabled && (
          <button
            type='button'
            className={s.clearBtn}
            onClick={clearValue}
            aria-label='Очистить выбранное значение'
          >
            &times;
          </button>
        )}
      </div>

      {name && (
        <input
          type='hidden'
          name={name}
          value={currentValue ?? ''}
        />
      )}

      {helperText && <span className={s.helperText}>{helperText}</span>}

      {isOpen && (
        <ul
          ref={listRef}
          className={s.dropdown}
          role='listbox'
          aria-labelledby={label ? labelId : id}
          aria-activedescendant={
            options[highlightedIndex]
              ? `option-${options[highlightedIndex].value}`
              : undefined
          }
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              id={`option-${option.value}`}
              className={s.option}
              data-highlighted={index === highlightedIndex || undefined}
              data-disabled={option.disabled || undefined}
              data-selected={option.value === currentValue || undefined}
              onClick={() => selectOption(option)}
              onMouseEnter={() =>
                !option.disabled && setHighlightedIndex(index)
              }
              role='option'
              aria-selected={option.value === currentValue}
              aria-disabled={option.disabled}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
