type LoaderSize = 'sm' | 'md' | 'lg';
type LoaderColor = 'default' | 'main' | 'dark' | 'success' | 'error';

export interface LoaderProps {
  size?: LoaderSize;
  color?: LoaderColor;
  className?: string;
  delay?: boolean;
}
