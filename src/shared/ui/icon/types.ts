import { Icons } from './constants';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: keyof typeof Icons;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}
