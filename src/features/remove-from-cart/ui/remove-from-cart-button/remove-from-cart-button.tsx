'use client';

import React from 'react';
import { useCartHydrated, useRemoveItem } from '@/src/entities/cart';
import { cn } from '@/src/shared/lib';
import { Button } from '@/src/shared/ui/client';
import { Icon, Loader } from '@/src/shared/ui/common';
import s from './remove-from-cart-button.module.scss';

export const RemoveFromCartButton = ({
  productId,
  className,
}: {
  productId: string;
  className?: string;
}) => {
  const isHydrated = useCartHydrated();
  const removeItem = useRemoveItem();

  const handleRemoveItem = (e: React.MouseEvent) => {
    e.preventDefault();

    removeItem(productId);
  };

  if (!isHydrated) {
    return (
      <Button
        disabled
        className={cn(s.button, className)}
      >
        <Loader
          size='sm'
          color='dark'
        />
      </Button>
    );
  }

  return (
    <Button
      onClick={handleRemoveItem}
      className={cn(s.button, className)}
    >
      <Icon
        name='Delete'
        aria-hidden='true'
      />
    </Button>
  );
};
