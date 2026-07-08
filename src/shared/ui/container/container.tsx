import { cn } from '@/src/shared/lib';
import type { ContainerProps } from './types';
import s from './container.module.scss';

export const Container = ({
  tag: Tag = 'div',
  className,
  size = 'default',
  children,
}: ContainerProps) => {
  return (
    <Tag
      className={cn(s.container, className)}
      data-size={size}
    >
      {children}
    </Tag>
  );
};
