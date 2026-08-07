import { ComponentPropsWithoutRef, CSSProperties, ElementType } from 'react';

export interface GridCustomStyles extends CSSProperties {
  '--grid-gap'?: string;
  '--grid-cols'?: number;
  '--grid-cols-tablet'?: number;
  '--grid-cols-mobile'?: number;
}

export type GridProps<T extends ElementType> = {
  as?: T;
  columns?: number;
  gap?: number;
} & ComponentPropsWithoutRef<T>;

export type ItemProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;
