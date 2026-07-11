import { cn } from '@/src/shared/lib';
import { DropdownItemProps } from '@/src/shared/ui/dropdown/types';
import s from './dropdown.module.scss';

export const DropdownItem = ({
  children,
  className,
  'aria-selected': ariaSelected = false,
  ...props
}: DropdownItemProps) => {
  return (
    <li
      className={cn(s.item, className)}
      role='option'
      tabIndex={-1}
      aria-selected={ariaSelected}
      {...props}
    >
      {children}
    </li>
  );
};
