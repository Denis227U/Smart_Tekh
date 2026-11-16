import { Suspense } from 'react';
import { mapOrderToPreviews } from '@/src/entities/order';
import { getOrderById } from '@/src/entities/order/server';
import { getCurrentUser } from '@/src/entities/user/server';
import { formatToLongDate } from '@/src/shared/lib';
import { OrderDetailsContent } from './order-details-content/order-details-content';
import { OrderDetailsEmpty } from './order-details-empty/order-details-empty';
import { OrderDetailsSkeleton } from './order-details-skeleton/order-details-skeleton';

const OrderDetailsAsync = async ({
  orderId,
  isJustCreated,
}: {
  orderId: string;
  isJustCreated: boolean;
}) => {
  const user = await getCurrentUser();

  if (!user) {
    return <OrderDetailsEmpty emptyMsg='Вы не авторизованы' />;
  }

  const order = await getOrderById(orderId, user?.id);
  const shortOrderId = orderId.slice(-8).toUpperCase();

  if (!order) {
    return (
      <OrderDetailsEmpty
        emptyMsg={`Информация о заказе № ${shortOrderId} не найдена`}
      />
    );
  }

  const { delivery, payment, recipient } = mapOrderToPreviews(order);

  return (
    <OrderDetailsContent
      orderId={shortOrderId}
      orderCreatedAt={formatToLongDate(order.createdAt)}
      orderStatus={order.status}
      orderItems={order.items}
      orderTotal={order.total}
      recipientEmail={recipient.recipientEmail}
      delivery={delivery}
      payment={payment}
      recipient={recipient}
      isJustCreated={isJustCreated}
    />
  );
};

export const OrderDetails = ({
  orderId,
  created,
}: {
  orderId: string;
  created: string | undefined;
}) => {
  return (
    <Suspense fallback={<OrderDetailsSkeleton />}>
      <OrderDetailsAsync
        orderId={orderId}
        isJustCreated={created === 'true'}
      />
    </Suspense>
  );
};
