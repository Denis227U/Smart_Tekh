'use client';

import {
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  useState,
} from 'react';
import { TabsContextState, TabsProviderProps, TabsValue } from './types';

const TabsContext = createContext<TabsContextState | null>(null);

export const useTabsContext = (componentName: string) => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error(`${componentName} must be used within Tabs`);
  }
  return context;
};

export const TabsProvider = ({
  children,
  defaultValue,
  value: controlledValue,
  onChange,
  orientation = 'horizontal',
}: TabsProviderProps) => {
  const [uncontrolledValue, setUncontrolledValue] = useState<TabsValue | null>(
    defaultValue ?? null,
  );
  const isControlled = controlledValue !== undefined;
  const activeValue = isControlled ? controlledValue : uncontrolledValue;
  const baseId = useId();

  const setActiveValue = useCallback(
    (newValue: TabsValue) => {
      if (!isControlled) {
        setUncontrolledValue(newValue);
      }
      onChange?.(newValue);
    },
    [isControlled, onChange],
  );

  const contextValue = useMemo<TabsContextState>(
    () => ({
      activeValue,
      setActiveValue,
      baseId,
      orientation,
    }),
    [activeValue, setActiveValue, baseId, orientation],
  );

  return (
    <TabsContext.Provider value={contextValue}>{children}</TabsContext.Provider>
  );
};
