'use client';

import React from 'react';
import {
  useAddToCart,
  useCartHydrated,
  useCartItemQuantity,
  type CartItemDto,
} from '@/src/entities/cart';
import { cn } from '@/src/shared/lib';
import { Button } from '@/src/shared/ui/client';
import { Counter, Icon, Loader } from '@/src/shared/ui/common';
import type { VariantButton } from '../../model/types';
import s from './add-to-cart-button.module.scss';

export const AddToCartButton = ({
  productId,
  productData,
  className,
  variant = 'icon',
}: {
  productId: string;
  productData: CartItemDto['product'];
  className?: string;
  variant?: VariantButton;
}) => {
  const isHydrated = useCartHydrated();
  const addToCart = useAddToCart();
  const quantityInCart = useCartItemQuantity(productId);
  const isInCart = quantityInCart > 0;
  const isStockExceeded = quantityInCart >= productData.stock;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();

    if (productData.stock <= 0) return;

    addToCart(productData, productId, (maxStock) =>
      alert(`Извините, доступно только ${maxStock} шт.`),
    );
  };

  if (!isHydrated) {
    return (
      <Button
        disabled
        variant={variant === 'icon' ? 'outline-gray' : 'main'}
        className={cn(s.button, s.loading, className)}
      >
        <Loader
          size='sm'
          color='dark'
        />
      </Button>
    );
  }

  if (productData.stock <= 0) {
    return null;
  }

  return (
    <Button
      onClick={handleAddToCart}
      variant='main'
      className={cn(s.button, isInCart && s.added, className)}
      disabled={isStockExceeded}
    >
      {variant === 'text' && (isInCart ? 'Добавлен' : 'В корзину')}

      {variant === 'icon' && (
        <Icon
          name={isInCart ? 'CartAdded' : 'Cart'}
          aria-hidden='true'
        />
      )}

      <Counter
        count={quantityInCart}
        className={s.badgeCounter}
        size='sm'
      />
    </Button>
  );
};
