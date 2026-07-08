import { cn } from '@/src/shared/lib';
import type { LoaderProps } from './types';
import s from './loader.module.scss';

export const Loader = ({
  size = 'md',
  color = 'default',
  className,
  delay = false,
}: LoaderProps) => {
  return (
    <div
      className={cn(s.loaderWrapper, className)}
      data-size={size}
      data-color={color}
      data-delay={delay || undefined}
      role='status'
    >
      <div className={s.glow} />
      <div className={s.spinner} />

      <span className='visually-hidden'>Загрузка...</span>
    </div>
  );
};
