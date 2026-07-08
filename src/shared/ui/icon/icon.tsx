import { Icons } from './constants';
import type { IconProps } from './types';

export const Icon = ({
  name,
  size,
  width,
  height,
  style,
  ...props
}: IconProps) => {
  const IconComponent = Icons[name];

  if (!IconComponent) return null;

  const finalHeight = size || height || '1.5em';
  const finalWidth = size || width || '1.5em';

  return (
    <IconComponent
      width={finalWidth}
      height={finalHeight}
      style={{
        flexShrink: 0,
        display: 'inline-block',
        lineHeight: 1,
        ...style,
      }}
      {...props}
    />
  );
};
