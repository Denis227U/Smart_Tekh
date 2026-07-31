export type OptionValue = string | number;

export interface Option {
  value: OptionValue;
  label: string;
  disabled?: boolean;
}

interface BaseSelectProps {
  options: readonly Option[];
  placeholder?: string;
  disabled?: boolean;
  isClearable?: boolean;
  className?: string;
  label?: string;
  name?: string;
  error?: boolean;
  helperText?: string;
}

interface ControlledSelectProps extends BaseSelectProps {
  value: OptionValue | null;
  onChange: (value: OptionValue | null) => void;
  defaultValue?: never;
}

interface UncontrolledSelectProps extends BaseSelectProps {
  defaultValue?: OptionValue | null;
  value?: never;
  onChange?: (value: OptionValue | null) => void;
}

export type SelectProps = ControlledSelectProps | UncontrolledSelectProps;
