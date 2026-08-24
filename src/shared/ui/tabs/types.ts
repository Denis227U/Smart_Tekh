import { PropsWithChildren } from 'react';

export type TabsValue = string | number;

type Orientation = 'horizontal' | 'vertical';

export type TabsContextState = {
  activeValue: TabsValue | null;
  setActiveValue: (value: TabsValue) => void;
  baseId: string;
  orientation: Orientation;
};

export type TabsProviderProps = PropsWithChildren<{
  defaultValue?: TabsValue;
  value?: TabsValue;
  onChange?: (value: TabsValue) => void;
  orientation?: Orientation;
}>;

export type TabsProps = TabsProviderProps & {
  className?: string;
};

export type TabsListProps = PropsWithChildren<{ className?: string }>;

export type TabsTriggerProps = PropsWithChildren<{
  value: TabsValue;
  className?: string;
  disabled?: boolean;
}>;

export type TabsContentProps = PropsWithChildren<{
  value: TabsValue;
  className?: string;
}>;
