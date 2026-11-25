'use client';

import { useRouter } from 'next/navigation';
import { CartProductDto } from '@/src/entities/cart';
import { ROUTES } from '@/src/shared/routes';
import { Button } from '@/src/shared/ui/client';
import { useSetBuyNowItem } from '../../model/actions';

export const BuyNowButton = ({
  product,
  className,
}: {
  product: CartProductDto;
  className?: string;
}) => {
  const router = useRouter();
  const setBuyNowItem = useSetBuyNowItem();

  const handleClick = () => {
    setBuyNowItem(product);
    router.push(ROUTES.CHECKOUT('buy-now'));
  };

  return (
    <Button
      type='button'
      variant='outline'
      onClick={handleClick}
      disabled={product.stock < 1}
      className={className}
    >
      Купить сейчас
    </Button>
  );
};
