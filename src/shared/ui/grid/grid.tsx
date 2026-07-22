import { cn } from '@/src/shared/lib';
import type { GridCustomStyles, GridProps } from './types';
import type { ElementType } from 'react';
import s from './grid.module.scss';

export const Grid = <T extends ElementType = 'div'>({
  as,
  children,
  className,
  columns = 1,
  tabletColumns,
  mobileColumns = 1,
  gap = 20,
  ...props
}: GridProps<T>) => {
  const Component = as || 'div';

  const finalTabletColumns =
    tabletColumns ??
    (columns === 3 || columns === 4 ? 2 : columns === 2 ? 1 : columns);

  const style: GridCustomStyles = {
    '--grid-gap': `${gap}px`,
    '--grid-cols': columns,
    '--grid-cols-tablet': finalTabletColumns,
    '--grid-cols-mobile': mobileColumns,
  };

  return (
    <Component
      className={cn(s.grid, className)}
      style={style}
      {...props}
    >
      {children}
    </Component>
  );
};
