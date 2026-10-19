'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ElementType, ReactNode, useId } from 'react';
import noProductImage from '@/src/shared/assets/no-photo.png';
import { cn } from '@/src/shared/lib';
import { Heading } from '@/src/shared/ui/common';
import s from './cart-item-row.module.scss';

export const CartItemRow = ({
  className,
  tag: Component = 'li',
  title,
  href,
  price,
  oldPrice,
  quantity,
  coverThumbnail,
  coverImageAlt,
  counterSlot,
  actionsSlot,
}: {
  className?: string;
  tag?: ElementType;
  title: string;
  href: string;
  price: number;
  oldPrice?: number;
  quantity: number;
  coverThumbnail?: string | null;
  coverImageAlt?: string | null;
  counterSlot?: ReactNode;
  actionsSlot?: ReactNode;
}) => {
  const id = useId();

  const totalPrice = price * quantity;
  const totalOldPrice = oldPrice ? oldPrice * quantity : null;

  return (
    <Component className={cn(s.row, className)}>
      <Image
        className={s.image}
        src={coverThumbnail ?? noProductImage}
        alt={coverImageAlt ?? ''}
        width={80}
        height={80}
      />

      <Link
        className={s.link}
        href={href}
      >
        <Heading
          id={id}
          tag='h4'
          variant='h6'
          className={s.title}
        >
          {title}
        </Heading>
      </Link>

      {counterSlot && <div className={s.counterWrp}>{counterSlot}</div>}

      <div className={s.priceWrp}>
        {totalOldPrice && <span className={s.priceOld}>{totalOldPrice} ₽</span>}
        <span className={s.priceCurrent}>{totalPrice} ₽</span>
      </div>

      {actionsSlot && <div className={s.actions}>{actionsSlot}</div>}
    </Component>
  );
};
