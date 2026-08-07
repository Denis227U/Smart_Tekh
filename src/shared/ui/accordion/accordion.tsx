'use client';

import { PropsWithChildren, useCallback, useState } from 'react';
import { cn } from '@/src/shared/lib';
import { Content } from './accordion-content';
import { AccordionContext } from './accordion-context';
import { Item } from './accordion-item';
import { Trigger } from './accordion-trigger';
import s from './accordion.module.scss';

/**
 * Accordion container component for creating expandable panels (Compound Component pattern).
 * Supports both controlled and uncontrolled states.
 *
 * @example
 * // 1. Uncontrolled mode
 * <Accordion type="single" defaultValue={['item-1']}>
 *   <Accordion.Item value="item-1">
 *     <Accordion.Trigger>Title</Accordion.Trigger>
 *     <Accordion.Content>Content</Accordion.Content>
 *   </Accordion.Item>
 * </Accordion>
 *
 * @example
 * // 2. Controlled mode
 * const [value, setValue] = useState<string[]>([]);
 * <Accordion type="multiple" value={value} onValueChange={setValue}>
 *   {...}
 * </Accordion>
 *
 * @param props
 * @param props.type - Determines if one or multiple items can be open.
 * @param props.defaultValue - Initial open item values. Uncontrolled mode only.
 * @param props.value - Controlled array of open item values. Controlled mode only.
 * @param props.onValueChange - Event handler called when open item values change. Works in both modes.
 */
export const Accordion = ({
  type = 'single',
  defaultValue = [],
  value: controlledValue,
  onValueChange,
  className,
  children,
}: PropsWithChildren<{
  type?: 'single' | 'multiple';
  defaultValue?: string[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
  className?: string;
}>) => {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue);
  const openItems = isControlled ? controlledValue : internalValue;

  const toggleItem = useCallback(
    (itemValue: string) => {
      let newOpen: string[];
      if (type === 'single') {
        newOpen = openItems.includes(itemValue) ? [] : [itemValue];
      } else {
        newOpen = openItems.includes(itemValue)
          ? openItems.filter((v) => v !== itemValue)
          : [...openItems, itemValue];
      }

      if (!isControlled) {
        setInternalValue(newOpen);
      }
      onValueChange?.(newOpen);
    },
    [type, openItems, isControlled, onValueChange],
  );

  return (
    <AccordionContext.Provider value={{ type, openItems, toggleItem }}>
      <div className={cn(s.accordion, className)}>{children}</div>
    </AccordionContext.Provider>
  );
};

Accordion.Item = Item;
Accordion.Trigger = Trigger;
Accordion.Content = Content;
