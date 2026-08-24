'use client';

import { cn } from '@/src/shared/lib';
import { TabsProvider } from './tabs-context';
import type { TabsProps } from './types';
import s from './tabs.module.scss';

/**
 * Root component for tabs. Manages the active tab state and provides access to it
 * for all child components.
 * Supports both controlled and uncontrolled behavior.
 *
 * @component
 * @param {TabsProps} props - The component props.
 * @param {React.ReactNode} props.children - Tab components layout (TabsList, TabsContent).
 * @param {string} [props.className] - Additional CSS classes for styling.
 * @param {TabsValue} [props.defaultValue] - Default active tab value (uncontrolled mode).
 * @param {TabsValue} [props.value] - Controlled active tab value.
 * @param {(value: TabsValue) => void} [props.onChange] - Callback triggered when the active tab changes.
 * @param {Orientation} [props.orientation='horizontal'] - Tab list orientation ('horizontal' | 'vertical').
 *
 * @component
 * @example
 * // Uncontrolled mode
 * <Tabs defaultValue="tab1">
 *   <TabsList>...</TabsList>
 *   <TabsContent value="tab1">...</TabsContent>
 * </Tabs>
 *
 * @example
 * // Сontrolled mode
 * const [value, setValue] = useState('tab1');
 * <Tabs value={value} onChange={setValue}>...</Tabs>
 */
export const Tabs = ({
  children,
  className,
  defaultValue,
  value,
  onChange,
  orientation = 'horizontal',
}: TabsProps) => {
  return (
    <TabsProvider
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      orientation={orientation}
    >
      <div className={cn(s.tabs, className)}>{children}</div>
    </TabsProvider>
  );
};
