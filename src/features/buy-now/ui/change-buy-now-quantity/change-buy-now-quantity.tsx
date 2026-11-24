'use client';

import { FieldCounter } from '@/src/shared/ui/client';
import { Loader } from '@/src/shared/ui/common';
import { useUpdateBuyNowQuantity } from '../../model/actions';
import { useBuyNowHydrated, useBuyNowItem } from '../../model/selectors';

export const ChangeBuyNowQuantity = ({ className }: { className?: string }) => {
  const isHydrated = useBuyNowHydrated();
  const item = useBuyNowItem();
  const updateQuantity = useUpdateBuyNowQuantity();

  if (!isHydrated) {
    return (
      <Loader
        size='sm'
        color='dark'
      />
    );
  }

  if (!item) {
    return null;
  }

  const currentStock = item.product.stock;
  const quantity = item.quantity;
  const isStockExceeded = quantity >= currentStock;

  const showAlert = (maxStock: number) =>
    alert(`Извините, доступно только ${maxStock} шт.`);

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentStock <= 0 || quantity <= 1) return;
    updateQuantity(quantity - 1, showAlert);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentStock <= 0 || isStockExceeded) return;
    updateQuantity(quantity + 1, showAlert);
  };

  const handleInputChange = (value: number) => {
    if (currentStock <= 0) return;
    updateQuantity(value, showAlert);
  };

  return (
    <FieldCounter
      className={className}
      min={1}
      max={currentStock}
      count={quantity}
      onDecrementAction={handleDecrement}
      onIncrementAction={handleIncrement}
      onInputChangeAction={handleInputChange}
    />
  );
};
