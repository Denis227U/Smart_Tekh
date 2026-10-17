'use client';

import {
  useCartHydrated,
  useCartItemQuantity,
  useCartItemStock,
  useUpdateQuantity,
  type CartItemDto,
} from '@/src/entities/cart';
import { cn } from '@/src/shared/lib';
import { FieldCounter } from '@/src/shared/ui/client';
import { Loader } from '@/src/shared/ui/common';
import s from './change-cart-item-quantity.module.scss';

export const ChangeCartItemQuantity = ({
  productId,
  userId,
  productData,
  className,
}: {
  productId: string;
  userId: string | undefined;
  productData: CartItemDto['product'];
  className?: string;
}) => {
  const isHydrated = useCartHydrated();
  const updateQuantity = useUpdateQuantity();
  const currentStock = useCartItemStock(productId, productData.stock);
  const quantityInCart = useCartItemQuantity(productId);
  const isStockExceeded = quantityInCart >= currentStock;

  const showAlert = (maxStock: number) =>
    alert(`Извините, доступно только ${maxStock} шт.`);

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();

    if (currentStock <= 0 || quantityInCart <= 1) return;

    updateQuantity(productId, quantityInCart - 1, userId, showAlert);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();

    if (currentStock <= 0 || isStockExceeded) return;

    updateQuantity(productId, quantityInCart + 1, userId, showAlert);
  };

  const handleInputChange = (value: number) => {
    if (currentStock <= 0) return;

    if (value > currentStock) {
      updateQuantity(productId, currentStock, userId, showAlert);
      return;
    }

    updateQuantity(productId, value, userId, showAlert);
  };

  if (!isHydrated) {
    return (
      <div className={s.loaderWrapper}>
        <Loader
          size='sm'
          color='dark'
        />
      </div>
    );
  }

  return (
    <FieldCounter
      className={cn(s.fieldCounter, className)}
      min={1}
      max={currentStock}
      count={quantityInCart}
      onDecrementAction={handleDecrement}
      onIncrementAction={handleIncrement}
      onInputChangeAction={handleInputChange}
    />
  );
};
