import type { ItemProps } from './types';
import type { ElementType } from 'react';

export const GridItem = <T extends ElementType = 'div'>({
  as,
  children,
  className,
  ...props
}: ItemProps<T>) => {
  const Component = as || 'div';

  return (
    <Component
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
};
