'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import {
  createOrder,
  useCheckoutDelivery,
  useCheckoutIsRecipientValid,
  useCheckoutPayment,
  useCheckoutRecipient,
  useResetCheckout,
} from '@/src/features/checkout';
import {
  useClearCart,
  useIsCartInitialized,
  useTotalItems,
  useTotalPrice,
} from '@/src/entities/cart';
import { cn, getPluralNoun } from '@/src/shared/lib';
import { ROUTES } from '@/src/shared/routes';
import { Button, FieldCheckbox } from '@/src/shared/ui/client';
import { Heading } from '@/src/shared/ui/common';
import { OrderSummarySkeleton } from './order-summary-skeleton';
import s from './order-summary.module.scss';

export const OrderSummary = ({ className }: { className?: string }) => {
  const [isChecked, setIsChecked] = useState(false);

  const isCartInitialized = useIsCartInitialized();
  const totalCount = useTotalItems();
  const totalPrice = useTotalPrice();
  const delivery = useCheckoutDelivery();
  const payment = useCheckoutPayment();
  const recipient = useCheckoutRecipient();
  const isRecipientValid = useCheckoutIsRecipientValid();

  const resetCheckout = useResetCheckout();
  const clearCart = useClearCart();

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const pluralNoun = getPluralNoun(totalCount, 'товар', 'товара', 'товаров');
  const isPickupPoint = delivery?.deliveryType === 'PICKUP';

  const isOrderReady = Boolean(
    totalCount > 0 &&
    delivery &&
    payment &&
    recipient &&
    isRecipientValid &&
    isChecked,
  );

  const handlePlaceOrder = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!delivery || !payment || !recipient || !isRecipientValid) return;

    startTransition(async () => {
      const result = await createOrder({
        delivery,
        payment,
        recipient,
      });

      if (!result.success) {
        alert(result.error);
        return;
      }

      resetCheckout();
      clearCart();

      router.push(
        `${ROUTES.PROFILE.ORDER_DETAILS(result.orderId)}?created=true`,
      );
    });
  };

  if (!isCartInitialized) {
    return <OrderSummarySkeleton />;
  }

  return (
    <div className={cn(s.summary, className)}>
      <div className={s.inner}>
        <Heading
          tag='h2'
          variant='h4'
          className={s.title}
        >
          Итого
        </Heading>

        <div className={s.info}>
          <div className={s.row}>
            <span className={s.label}>
              {totalCount} {pluralNoun} на сумму
            </span>
            <span className={s.value}>{totalPrice.toLocaleString()} ₽</span>
          </div>

          {!isPickupPoint ? (
            <div className={s.row}>
              <span className={s.label}>Стоимость доставки</span>
              <span className={s.value}>бесплатно</span>
            </div>
          ) : (
            <div className={s.row}>
              <span className={s.label}>Самовывоз</span>
              <span className={s.value}>бесплатно</span>
            </div>
          )}
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className={cn(s.row, s.rowTotal)}>
            <span className={s.labelTotal}>К оплате</span>
            <span className={s.priceTotal}>
              {totalPrice.toLocaleString()} ₽
            </span>
          </div>

          <Button
            type='submit'
            variant='main'
            className={s.submitBtn}
            disabled={!isOrderReady || isPending}
          >
            {isPending ? 'Оформление...' : 'Оформить заказ'}
          </Button>
        </form>
      </div>

      <FieldCheckbox
        text='Подтверждая заказ, я принимаю условия'
        link={{
          label: ' пользовательского соглашения',
          href: '/terms',
          isExternal: true,
        }}
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
      />
    </div>
  );
};
