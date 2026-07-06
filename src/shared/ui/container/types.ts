import { ElementType, PropsWithChildren } from 'react';

export type ContainerSize = 'default' | 'md' | 'sm' | 'fluid';

export type ContainerProps = PropsWithChildren<{
  tag?: ElementType;
  className?: string;
  size?: ContainerSize;
}>;
