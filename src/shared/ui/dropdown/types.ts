import { ComponentPropsWithoutRef, ReactNode } from 'react';

export type DropdownProps = {
  children: ReactNode;
  /** If not a ReactElement, it will be wrapped in a button */
  trigger: ReactNode;
  /** Controlled open state */
  open?: boolean;
  /** Initial state for uncontrolled mode */
  defaultOpen?: boolean;
  /** Callback available in both modes (required for controlled mode) */
  onOpenChange?: (open: boolean) => void;
  containerClassName?: string;
  listClassName?: string;
  /** Default is true */
  closeOnClickOutside?: boolean;
  /** Default is true */
  closeOnEscape?: boolean;
  /** Horizontal alignment of the container */
  align?: 'left' | 'right';
  /** Horizontal alignment of the item content */
  itemAlign?: 'left' | 'center' | 'right';
  /** Render the list via a portal */
  usePortal?: boolean;
};

export type DropdownItemProps = ComponentPropsWithoutRef<'li'>;
