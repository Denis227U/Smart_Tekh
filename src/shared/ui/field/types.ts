import {
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
  Ref,
} from 'react';

export type FieldCustomProps = {
  label: string;
  isRequired?: boolean;
  isVisibleLabel?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  error?: boolean;
  helperText?: string;
  className?: string;
  wrapperAs?: React.ElementType;
};

export interface FieldLayoutProps extends Pick<
  FieldCustomProps,
  'className' | 'prefix' | 'suffix' | 'wrapperAs' | 'error' | 'helperText'
> {
  id: string;
  control: ReactNode;
  multiline?: boolean;
  label: string;
  isRequired: boolean;
  isVisibleLabel: boolean;
  styles: Record<string, string>;
}

export type InputFieldProps = FieldCustomProps & {
  multiline?: false;
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'number' | 'search';
  ref?: Ref<HTMLInputElement>;
} & Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'type' | 'required' | 'prefix' | 'ref'
  >;

export type TextareaFieldProps = FieldCustomProps & {
  multiline: true;
  type?: never;
  ref?: Ref<HTMLTextAreaElement>;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'required' | 'ref'>;

export type FieldProps = InputFieldProps | TextareaFieldProps;
