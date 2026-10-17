'use client';

import { ChangeCartItemQuantity } from '@/src/features/change-cart-item-quantity';
import { RemoveFromCartButton } from '@/src/features/remove-from-cart';
import {
  CartItemRow,
  useCartHydrated,
  useCartItems,
  useIsCartInitialized,
} from '@/src/entities/cart';
import { useSession } from '@/src/entities/user';
import { CartItemsSkeleton } from './cart-items-skeleton';
import s from './cart-items.module.scss';

export const CartItems = () => {
  const { user } = useSession();
  const isCartInitialized = useIsCartInitialized();

  const items = useCartItems();
  const isHydrated = useCartHydrated();

  if (!isHydrated) {
    return <CartItemsSkeleton />;
  }

  if (!items || items.length === 0) {
    return <div className={s.empty}>Ваша корзина пуста</div>;
  }

  return (
    <div>
      {!isCartInitialized ? (
        <CartItemsSkeleton />
      ) : (
        <ul className={s.list}>
          {items.map((item) => {
            if (!item.product) {
              console.error(
                `Элемент корзины с productId: ${item.productId} не содержит объект product!`,
                item,
              );
              return null;
            }

            return (
              <CartItemRow
                key={item.productId}
                className={s.item}
                title={item.product.title}
                href={item.product.slug}
                price={item.product.price}
                oldPrice={item.product.oldPrice ?? undefined}
                quantity={item.quantity}
                coverThumbnail={item.product.coverThumbnail}
                coverImageAlt={item.product.coverImageAlt}
                counterSlot={
                  <ChangeCartItemQuantity
                    productId={item.productId}
                    productData={item.product}
                    userId={user?.id}
                  />
                }
                actionsSlot={
                  <RemoveFromCartButton
                    productId={item.productId}
                    userId={user?.id}
                  />
                }
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};
