import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type BaseProps = {
  children: ReactNode;
  variant?: 'main-dark';
  className?: string;
  icon?: ReactNode;
  align?: 'left' | 'center' | 'right';
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
};

type ButtonAsLinkProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export type ButtonAsButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

export type ButtonProps = ButtonAsLinkProps | ButtonAsButtonProps;
