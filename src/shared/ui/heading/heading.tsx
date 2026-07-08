import { ElementType, ReactNode } from 'react';
import { cn } from '@/src/shared/lib';
import s from './heading.module.scss';

type HeadingVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export const Heading = ({
  tag: Tag = 'h2',
  variant = 'h2',
  className,
  children,
  id,
}: {
  tag?: ElementType;
  variant?: HeadingVariant;
  className?: string;
  children: ReactNode;
  id?: string;
}) => {
  return (
    <Tag
      id={id}
      className={cn(s.heading, className)}
      data-variant={variant}
    >
      {children}
    </Tag>
  );
};
