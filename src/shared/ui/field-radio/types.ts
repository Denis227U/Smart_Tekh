export interface RadioOption {
  value: string | number;
  label: React.ReactNode | ((isChecked: boolean) => React.ReactNode); // string or render prop for complex layouts
  disabled?: boolean;
}

interface BaseRadioProps {
  className?: string;
  options: RadioOption[];
  name: string;
  disabled?: boolean;
  variant?: 'card' | 'simple';
  ariaLabelledBy?: string;
  ariaLabel?: string;
  error?: boolean;
  helperText?: string;
}

interface ControlledRadioProps extends BaseRadioProps {
  value: string | number;
  onChange: (value: string | number) => void;
  defaultValue?: never;
}

interface UncontrolledRadioProps extends BaseRadioProps {
  defaultValue?: string | number;
  onChange?: (value: string | number) => void;
  value?: never;
}

export type FieldRadioProps = ControlledRadioProps | UncontrolledRadioProps;
