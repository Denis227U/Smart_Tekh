import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type BaseProps = {
  children: ReactNode;
  variant?: 'main-dark';
  className?: string;
  icon?: ReactNode;
};

type LinkProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

export type TButtonProps = LinkProps | ButtonProps;
