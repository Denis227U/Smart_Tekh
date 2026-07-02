import { InputHTMLAttributes } from 'react';

interface CheckboxLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

export type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type'
> & {
  text: string;
  link?: CheckboxLink;
};
