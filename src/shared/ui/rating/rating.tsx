import { cn } from '@/src/shared/lib';
import { Icon } from '@/src/shared/ui/common';
import s from './rating.module.scss';

interface RatingProps {
  id: string;
  value: number;
  max?: number;
  className?: string;
}

export const Rating = ({ id, value, max = 5, className }: RatingProps) => {
  const ratingValue = Math.min(Math.max(value, 0), max);

  // Extracting the fractional part (e.g., 0.7 for 4.7)"
  const remainder = ratingValue % 1;
  const percent = Math.round(remainder * 100);

  const gradientId = `star-grad-${id}`;
  const ariaLabel = `Рейтинг: ${ratingValue} из ${max}`;

  return (
    <div
      className={cn(s.rating, className)}
      role='img'
      aria-label={ariaLabel}
      title={ariaLabel}
    >
      {/* Determining gradient. If there is no remainder (exactly 5.0), gradient does not matter */}
      {remainder > 0 && (
        <svg
          width='0'
          height='0'
          style={{ position: 'absolute' }}
        >
          <defs>
            <linearGradient
              id={gradientId}
              x1='0'
              x2='1'
              y1='0'
              y2='0'
            >
              <stop
                offset={`${percent}%`}
                stopColor='var(--color-orange-40, #facc15)'
              />
              <stop
                offset={`${percent}%`}
                stopColor='var(--color-gray-30, #d1d5db)'
              />
            </linearGradient>
          </defs>
        </svg>
      )}

      {Array.from({ length: max }).map((_, i) => {
        const starIndex = i + 1;
        const isFull = starIndex <= Math.floor(ratingValue);
        const isPartial = starIndex === Math.ceil(ratingValue) && remainder > 0;

        return (
          <Icon
            key={i}
            name='Star'
            size={20}
            className={cn(s.star, {
              [s.full]: isFull,
              [s.partial]: isPartial,
            })}
            style={isPartial ? { fill: `url(#${gradientId})` } : {}}
            aria-hidden='true'
          />
        );
      })}
    </div>
  );
};
