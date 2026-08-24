import { cn, formatToLongDate, getAssetUrl } from '@/src/shared/lib';
import { Avatar } from '@/src/shared/ui/client';
import { Rating } from '@/src/shared/ui/common';
import type { ReviewDto } from '../../model/types';
import s from './review-card.module.scss';

interface ReviewCardProps extends ReviewDto {
  className?: string;
}

export const ReviewCard = ({
  id,
  authorName,
  avatarSrc,
  createdAt,
  rating,
  text,
  className,
}: ReviewCardProps) => {
  const fullAvatarSrc = avatarSrc ? getAssetUrl(avatarSrc) : null;

  return (
    <article className={cn(s.card, className)}>
      <header className={s.header}>
        <Avatar
          name={authorName}
          src={fullAvatarSrc}
        />

        <div className={s.meta}>
          <span className={s.author}>{authorName}</span>
          <time
            dateTime={createdAt.toString()}
            suppressHydrationWarning
          >
            {formatToLongDate(createdAt)}
          </time>
        </div>

        <Rating
          id={id}
          value={rating}
          className={s.rating}
        />
      </header>

      <div className={s.content}>
        <p className={s.text}>{text}</p>
      </div>
    </article>
  );
};
