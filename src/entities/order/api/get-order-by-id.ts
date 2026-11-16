import 'server-only';

import { prisma } from '@/src/shared/api';

export async function getOrderById(orderId: string, userId: string) {
  if (!userId) return null;

  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      userId,
    },
    include: {
      items: true,
      pickupPoint: true,
      paymentMethod: true,
    },
  });

  if (!order) return null;

  return {
    ...order,
    total: Number(order.total),
    items: order.items.map((item) => ({
      ...item,
      productPrice: Number(item.productPrice),
    })),
  };
}
