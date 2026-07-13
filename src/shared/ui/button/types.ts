import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
  Ref,
} from 'react';

type BaseProps<T> = {
  children: ReactNode;
  variant?: 'main-dark';
  className?: string;
  icon?: ReactNode;
  align?: 'left' | 'center' | 'right';
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  ref?: Ref<T>;
};

type ButtonAsLinkProps = BaseProps<HTMLAnchorElement> &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export type ButtonAsButtonProps = BaseProps<HTMLButtonElement> &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

export type ButtonProps = ButtonAsLinkProps | ButtonAsButtonProps;
