'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import {
  createOrder,
  useCheckoutDelivery,
  useCheckoutDeliveryDraft,
  useCheckoutIsRecipientValid,
  useCheckoutPayment,
  useCheckoutRecipient,
  useResetCheckout,
} from '@/src/features/checkout';
import { calculateDeliveryCost } from '@/src/entities/order';
import { DeliveryType } from '@/src/shared/api/enums';
import { cn, getPluralNoun } from '@/src/shared/lib';
import { ROUTES } from '@/src/shared/routes';
import { Button, FieldCheckbox } from '@/src/shared/ui/client';
import { Heading } from '@/src/shared/ui/common';
import { useCheckoutItemsSource } from '../../model/use-checkout-items-source';
import { OrderSummarySkeleton } from './order-summary-skeleton';
import s from './order-summary.module.scss';

export const OrderSummary = ({
  className,
  onOrderSuccess,
}: {
  className?: string;
  onOrderSuccess?: () => void;
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const { isBuyNow, items, totalCount, totalPrice, isReady, clearSource } =
    useCheckoutItemsSource();

  const delivery = useCheckoutDelivery();
  const deliveryDraft = useCheckoutDeliveryDraft();
  const payment = useCheckoutPayment();
  const recipient = useCheckoutRecipient();
  const isRecipientValid = useCheckoutIsRecipientValid();
  const resetCheckout = useResetCheckout();

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const pluralNoun = getPluralNoun(totalCount, 'товар', 'товара', 'товаров');
  const activeDeliveryType = deliveryDraft.deliveryType;
  const isPickupPoint = activeDeliveryType === DeliveryType.PICKUP;
  const isEmptyCart = totalCount === 0;

  const deliveryCost = calculateDeliveryCost({
    deliveryType: activeDeliveryType,
    city: deliveryDraft.city,
    timeSlot: deliveryDraft.deliveryTime,
    itemsTotal: totalPrice,
  });

  const finalTotal = totalPrice + deliveryCost;

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

    const buyNowProduct = isBuyNow ? items[0] : undefined;

    startTransition(async () => {
      const result = await createOrder({
        delivery,
        payment,
        recipient,
        ...(buyNowProduct
          ? {
              buyNowItem: {
                productId: buyNowProduct.productId,
                quantity: buyNowProduct.quantity,
              },
            }
          : {}),
      });

      if (!result.success) {
        alert(result.error);
        return;
      }

      onOrderSuccess?.();
      resetCheckout();
      clearSource();

      router.replace(
        `${ROUTES.PROFILE.ORDER_DETAILS(result.orderId)}?created=true`,
      );
    });
  };

  if (!isReady) {
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

          <div className={s.row}>
            <span className={s.label}>
              {isPickupPoint ? 'Самовывоз' : 'Стоимость доставки'}
            </span>
            <span className={s.value}>
              {isEmptyCart
                ? '—'
                : deliveryCost === 0
                  ? 'бесплатно'
                  : `${deliveryCost.toLocaleString()} ₽`}
            </span>
          </div>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className={cn(s.row, s.rowTotal)}>
            <span className={s.labelTotal}>К оплате</span>
            <span className={s.priceTotal}>
              {finalTotal.toLocaleString()} ₽
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
