'use server';

import { mapServerToCartDto } from '@/src/entities/cart/lib/map-to-cart-dto';
import { prisma } from '@/src/shared/api';
import type { CartItemDto, LocalCartItem } from '../model/types';

/**
 * Server action for synchronizing and enriching the authenticated user's cart data.
 *
 * @description
 * This function accepts a flat cart structure from the client and updates the database state.
 * The method operates in two modes based on the `isMerge` flag:
 * 1. **Merge Strategy (`isMerge: true`):** Combines the user's server cart with the guest's local cart (used upon initial login). If IDs match, the larger quantity (`Math.max`) is selected.
 * 2. **Overwrite Strategy (`isMerge: false`):** Completely replaces the server state with the client data (used for debounced synchronization of the user's active clicks during a session).
 *
 * As output, the function automatically performs a `join` (`include: { product: true }`) with the products table, calculates up-to-date prices, and returns a strictly typed array of `CartItemDto` to the frontend.
 *
 * @param userId - The unique identifier of the authenticated user.
 * @param localItems - Array of flat client cart objects (containing only `productId` and `quantity`).
 * @param isMerge - Flag determining the operation mode: `true` for merging with the DB, `false` for a complete overwrite.
 */
export async function syncCart(
  userId: string,
  localItems: LocalCartItem[],
  isMerge = false,
): Promise<
  { success: true; items: CartItemDto[] } | { success: false; error: string }
> {
  try {
    return await prisma.$transaction(async (tx) => {
      let cart = await tx.cart.findUnique({
        where: { userId },
        include: { items: true },
      });

      if (!cart) {
        cart = await tx.cart.create({
          data: { userId },
          include: { items: true },
        });
      }

      const finalItemsMap = new Map<string, number>();

      if (isMerge) {
        // Merge Strategy

        // Populating the map with current items from the database
        cart.items.forEach((item) =>
          finalItemsMap.set(item.productId, item.quantity),
        );

        for (const local of localItems) {
          const serverQty = finalItemsMap.get(local.productId) || 0;
          finalItemsMap.set(
            local.productId,
            Math.max(serverQty, local.quantity),
          );
        }
      } else {
        // Overwrite Strategy
        // Client is the single source of truth
        localItems.forEach((item) =>
          finalItemsMap.set(item.productId, item.quantity),
        );
      }

      // Synchronizing with the DB (deleting old data, writing new)
      await tx.cartItem.deleteMany({ where: { cartId: cart.id } });
      const updatedItemsPayload = Array.from(finalItemsMap.entries()).map(
        ([productId, quantity]) => ({
          cartId: cart.id,
          productId,
          quantity,
        }),
      );
      if (updatedItemsPayload.length > 0) {
        await tx.cartItem.createMany({
          data: updatedItemsPayload,
        });
      }

      const freshCartItems = await tx.cartItem.findMany({
        where: { cartId: cart.id },
        include: {
          product: true,
        },
        orderBy: { createdAt: 'desc' },
      });

      const mappedItems: CartItemDto[] = freshCartItems.map((item) =>
        mapServerToCartDto({
          id: item.id,
          productId: item.productId,
          quantity: item.quantity,
          product: item.product,
          createdAt: item.createdAt,
        }),
      );

      return {
        success: true,
        items: mappedItems,
      };
    });
  } catch (error) {
    console.error('Ошибка Debounce-синхронизации:', error);
    return { success: false, error: 'Не удалось синхронизировать корзину' };
  }
}
