'use client';

import { ROUTES } from '@/src/shared/routes';
import { Badge, Icon } from '@/src/shared/ui/common';
import { useTotalItems } from '../../model/selectors';

export const CartHeaderLink = () => {
  const totalCount = useTotalItems();

  return (
    <Badge
      href={ROUTES.CHECKOUT}
      label='Корзина'
      count={totalCount}
    >
      <Icon
        name='Cart'
        height={20}
      />
    </Badge>
  );
};
