import type { InputFieldProps } from '@/src/shared/ui/field';

type LinkAlign = 'left' | 'right';

export interface FieldRevealProps extends Omit<
  InputFieldProps,
  'type' | 'prefix' | 'suffix'
> {
  linkHref?: string;
  linkText?: string;
  linkClassName?: string;
  linkAlign?: LinkAlign;
  className?: string;
}
