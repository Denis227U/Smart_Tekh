import { ChangeBuyNowQuantity } from '@/src/features/buy-now';
import { ChangeCartItemQuantity } from '@/src/features/change-cart-item-quantity';
import { RemoveFromCartButton } from '@/src/features/remove-from-cart';
import { CartItemRow } from '@/src/entities/cart';
import { useSession } from '@/src/entities/user';
import { cn } from '@/src/shared/lib';
import { useCheckoutItemsSource } from '../../../model/use-checkout-items-source';
import { CartItemsSkeleton } from './cart-items-skeleton';
import s from './cart-items-step.module.scss';

export const CartItemsContent = ({
  isCollapsed = false,
}: {
  isCollapsed?: boolean;
}) => {
  const { user } = useSession();
  const { items, isReady, isBuyNow } = useCheckoutItemsSource();

  if (!isReady) {
    return <CartItemsSkeleton />;
  }

  if (!items || items.length === 0) {
    return (
      <div className={s.empty}>
        {isBuyNow
          ? 'Товар для быстрого заказа не выбран'
          : 'Ваша корзина пуста'}
      </div>
    );
  }

  return (
    <ul className={cn(s.list, isCollapsed && s.collapsed)}>
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
              isBuyNow ? (
                <ChangeBuyNowQuantity />
              ) : (
                <ChangeCartItemQuantity
                  productId={item.productId}
                  productData={item.product}
                  userId={user?.id}
                />
              )
            }
            actionsSlot={
              !isBuyNow && (
                <RemoveFromCartButton
                  productId={item.productId}
                  userId={user?.id}
                />
              )
            }
          />
        );
      })}
    </ul>
  );
};
