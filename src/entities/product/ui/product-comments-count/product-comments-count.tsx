import { cn } from '@/src/shared/lib';
import { Icon } from '@/src/shared/ui/common';
import s from './product-comments-count.module.scss';

export const ProductCommentsCount = ({
  className,
  count,
}: {
  className?: string;
  count: number;
}) => {
  const label = `Количество комментариев: ${count}`;

  return (
    <div
      className={cn(s.badge, className)}
      aria-label={label}
      title={label}
    >
      <Icon
        name='Chat'
        size={18}
        aria-hidden='true'
      />

      <span
        className={s.count}
        aria-hidden='true'
      >
        {count}
      </span>
    </div>
  );
};
