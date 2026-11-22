import Link from 'next/link';
import {
  DeliveryPreview,
  ORDER_STATUS_LABELS,
  OrderDeliveryView,
  OrderPaymentView,
  OrderRecipientView,
  PaymentPreview,
  RecipientPreview,
  type OrderItemDto,
} from '@/src/entities/order';
import { OrderStatus } from '@/src/shared/api/enums';
import { cn } from '@/src/shared/lib';
import { ROUTES } from '@/src/shared/routes';
import { Heading } from '@/src/shared/ui/common';
import s from './order-details-content.module.scss';

export const OrderDetailsContent = ({
  orderId,
  orderCreatedAt,
  orderStatus,
  orderItems,
  itemsTotal,
  deliveryCost,
  orderTotal,
  recipientEmail,
  delivery,
  payment,
  recipient,
  isJustCreated,
}: {
  orderId: string;
  orderCreatedAt: string;
  orderStatus: OrderStatus;
  orderItems: OrderItemDto[];
  itemsTotal: number;
  deliveryCost: number;
  orderTotal: number;
  recipientEmail: string;
  delivery: OrderDeliveryView;
  payment: OrderPaymentView | null;
  recipient: OrderRecipientView;
  isJustCreated: boolean;
}) => {
  const isPickup = delivery.deliveryType === 'PICKUP';

  return (
    <div className={s.page}>
      {isJustCreated && (
        <div className={s.successBanner}>
          <Heading
            tag='h2'
            variant='h4'
          >
            Спасибо! Ваш заказ успешно оформлен
          </Heading>
          <p>
            Мы отправили детали заказа на <strong>{recipientEmail}</strong>.
          </p>
        </div>
      )}

      <div className={s.header}>
        <div>
          {/* <Link
            href={ROUTES.PROFILE.ORDERS}
            className={s.backLink}
          >
            ← К списку заказов
          </Link> */}
          <Link
            href={ROUTES.MAIN}
            className={s.backLink}
          >
            ← На главную
          </Link>
          <Heading
            tag='h1'
            variant='h2'
            className={s.title}
          >
            Заказ № {orderId}
          </Heading>
          <p className={s.date}>от {orderCreatedAt}</p>
        </div>

        <span
          className={s.statusBadge}
          data-status={orderStatus}
        >
          {ORDER_STATUS_LABELS[orderStatus]}
        </span>
      </div>

      <div className={s.detailsGrid}>
        <section className={s.card}>
          <Heading
            tag='h3'
            variant='h4'
            className={s.cardTitle}
          >
            Доставка
          </Heading>
          <DeliveryPreview delivery={delivery} />
        </section>

        <section className={s.card}>
          <Heading
            tag='h3'
            variant='h4'
            className={s.cardTitle}
          >
            Оплата
          </Heading>
          <PaymentPreview payment={payment} />
        </section>

        <section className={s.card}>
          <Heading
            tag='h3'
            variant='h4'
            className={s.cardTitle}
          >
            Получатель
          </Heading>
          <RecipientPreview recipient={recipient} />
        </section>
      </div>

      <div className={s.bottomGrid}>
        <section className={s.itemsSection}>
          <Heading
            tag='h3'
            variant='h4'
            className={s.cardTitle}
          >
            Состав заказа
          </Heading>

          <ul className={s.itemsList}>
            {orderItems.map((item) => (
              <li
                key={item.id}
                className={s.itemRow}
              >
                <div className={s.itemInfo}>
                  <span className={s.itemTitle}>{item.productTitle}</span>
                  <span className={s.itemQty}>{item.quantity} шт.</span>
                </div>
                <span className={s.itemPrice}>
                  {(item.productPrice * item.quantity).toLocaleString('ru-RU')}{' '}
                  ₽
                </span>
              </li>
            ))}
          </ul>
        </section>

        <aside className={cn(s.card, s.summaryCard)}>
          <Heading
            tag='h3'
            variant='h4'
            className={s.cardTitle}
          >
            Итого
          </Heading>

          <div className={s.summaryList}>
            <div className={s.summaryRow}>
              <span>Товары:</span>
              <span>{itemsTotal.toLocaleString('ru-RU')} ₽</span>
            </div>

            <div className={s.summaryRow}>
              <span>{isPickup ? 'Самовывоз:' : 'Доставка:'}</span>
              <span>
                {deliveryCost === 0
                  ? 'бесплатно'
                  : `${deliveryCost.toLocaleString('ru-RU')} ₽`}
              </span>
            </div>
          </div>

          <div className={s.totalRow}>
            <span>К оплате:</span>
            <strong>{orderTotal.toLocaleString('ru-RU')} ₽</strong>
          </div>
        </aside>
      </div>
    </div>
  );
};
