'use server';

import { revalidatePath } from 'next/cache';
import { calculateDeliveryCost } from '@/src/entities/order';
import { getCurrentUser } from '@/src/entities/user/server';
import { prisma } from '@/src/shared/api';
import {
  CityCode,
  DeliveryType,
  OrderStatus,
  PaymentMethodCode,
  PaymentStatus,
} from '@/src/shared/api/enums';
import { ROUTES } from '@/src/shared/routes';
import { createOrderSchema } from '../model/create-order-schema';
import { type CreateOrderInput } from '../model/types';

/**
 * Server action to place an order for the currently authenticated user.
 *
 * Executes the full order creation process:
 * 1. Verifies user authentication and validates input data against `createOrderSchema`.
 * 2. Fetches the cart from the database, checks product availability (`stock`), and calculates the total amount on the server.
 * 3. Calculate shipping cost and total order amount.
 * 4. Validates that the selected payment method and pickup point (for store pickup) are active.
 * 5. Within an atomic transaction (`prisma.$transaction`), decrements product stock, creates the order (`Order`),
 *    order items (`OrderItem`), payment record (`Payment` for online payments), and clears the cart.
 * 6. Revalidates the cache for the checkout and order history pages.
 *
 * @param rawInput - Order checkout data (delivery details, payment method, and recipient contacts).
 * @returns Result object: `{ success: true, orderId, shouldRedirectToPayment }` on success
 * or `{ success: false, error }` with a user-facing error message.
 */

export type CreateOrderResult =
  | { success: true; orderId: string; shouldRedirectToPayment: boolean }
  | { success: false; error: string };

export async function createOrder(
  rawInput: CreateOrderInput,
): Promise<CreateOrderResult> {
  try {
    const user = await getCurrentUser();
    const userId = user?.id;

    if (!userId) {
      return {
        success: false,
        error: 'Необходимо авторизоваться для оформления заказа',
      };
    }

    const parsed = createOrderSchema.safeParse(rawInput);

    if (!parsed.success) {
      return {
        success: false,
        error:
          'Некорректные данные оформления заказа. Проверьте заполненные поля',
      };
    }

    const { delivery, payment, recipient } = parsed.data;

    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      return {
        success: false,
        error: 'Ваша корзина пуста',
      };
    }

    let itemsTotal = 0; // current order total
    const stockErrors: string[] = [];

    for (const item of cart.items) {
      if (item.product.stock < item.quantity) {
        stockErrors.push(
          item.product.stock === 0
            ? `«${item.product.title}» закончился на складе`
            : `«${item.product.title}» (доступно только ${item.product.stock} шт.)`,
        );
      }

      itemsTotal += Number(item.product.price) * item.quantity;
    }

    if (stockErrors.length > 0) {
      return {
        success: false,
        error: `Недостаточно товара: ${stockErrors.join(', ')}`,
      };
    }

    const deliveryCost = calculateDeliveryCost({
      deliveryType: delivery.deliveryType,
      city: delivery.city as CityCode,
      timeSlot:
        delivery.deliveryType === DeliveryType.DELIVERY
          ? delivery.deliveryTime
          : null,
      itemsTotal,
    });

    const totalAmount = itemsTotal + deliveryCost;

    const orderItemsData = cart.items.map((item) => ({
      productId: item.product.id,
      productTitle: item.product.title,
      productPrice: item.product.price,
      productSlug: item.product.slug,
      quantity: item.quantity,
    }));

    const paymentMethodRecord = await prisma.paymentMethod.findUnique({
      where: { code: payment.paymentMethod },
    });

    if (!paymentMethodRecord || !paymentMethodRecord.isActive) {
      return {
        success: false,
        error: 'Выбранный способ оплаты временно недоступен',
      };
    }

    if (delivery.deliveryType === DeliveryType.PICKUP) {
      const pickupPoint = await prisma.pickupPoint.findUnique({
        where: { id: delivery.pickupPointId },
      });

      if (!pickupPoint || !pickupPoint.isActive) {
        return {
          success: false,
          error: 'Выбранный пункт выдачи недоступен',
        };
      }
    }

    const isOnlinePayment =
      payment.paymentMethod === PaymentMethodCode.CARD_ONLINE ||
      payment.paymentMethod === PaymentMethodCode.SBP;

    const createdOrder = await prisma.$transaction(async (tx) => {
      // Decrement stock for each item
      for (const item of cart.items) {
        const updated = await tx.product.updateMany({
          where: {
            id: item.productId,
            stock: { gte: item.quantity },
          },
          data: {
            stock: { decrement: item.quantity },
          },
        });

        if (updated.count === 0) {
          throw new Error(`INSUFFICIENT_STOCK:${item.product.title}`);
        }
      }

      const order = await tx.order.create({
        data: {
          userId,
          deliveryType: delivery.deliveryType,
          city: delivery.city as CityCode,

          ...(delivery.deliveryType === DeliveryType.DELIVERY
            ? {
                deliveryDate: new Date(delivery.deliveryDate),
                deliveryTime: delivery.deliveryTime,
                street: delivery.street,
                apartment: delivery.apartment,
                comment: delivery.comment ?? null,
              }
            : {
                pickupPointId: delivery.pickupPointId,
              }),

          paymentMethodId: paymentMethodRecord.id,

          recipientFirstname: recipient.recipientFirstname,
          recipientLastname: recipient.recipientLastname,
          recipientPhone: recipient.recipientPhone,
          recipientEmail: recipient.recipientEmail,
          recipientNoCall: recipient.recipientNoCall,

          itemsTotal,
          deliveryCost,
          total: totalAmount,
          status: OrderStatus.PENDING,

          // Denormalized snapshot of order items
          items: {
            create: orderItemsData,
          },

          ...(isOnlinePayment
            ? {
                payments: {
                  create: {
                    amount: totalAmount,
                    status: PaymentStatus.PENDING,
                  },
                },
              }
            : {}),
        },
      });

      await tx.cartItem.deleteMany({
        where: { cartId: cart.id },
      });

      return order;
    });

    revalidatePath(ROUTES.CHECKOUT);
    revalidatePath(ROUTES.PROFILE.ORDERS);

    return {
      success: true,
      orderId: createdOrder.id,
      shouldRedirectToPayment: isOnlinePayment,
    };
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.startsWith('INSUFFICIENT_STOCK:')
    ) {
      const productTitle = error.message.replace('INSUFFICIENT_STOCK:', '');
      return {
        success: false,
        error: `К сожалению, товар «${productTitle}» только что закончился на складе`,
      };
    }

    console.error('[CREATE_ORDER_ERROR]:', error);

    return {
      success: false,
      error: 'Произошла ошибка при оформлении заказа. Попробуйте еще раз',
    };
  }
}
