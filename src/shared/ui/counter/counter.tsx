import { cn } from '@/src/shared/lib';
import s from './counter.module.scss';

interface CounterProps {
  count: number;
  className?: string;
  size?: 'sm' | 'default';
}

export const Counter = ({
  count,
  className,
  size = 'default',
}: CounterProps) => {
  if (count <= 0) return null;

  const isSingleDigit = count <= 9;

  return (
    <span
      className={cn(
        s.counter,
        s[size],
        isSingleDigit ? s.circle : s.rect,
        className,
      )}
    >
      {count}
    </span>
  );
};
