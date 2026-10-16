import { Loader } from '@/src/shared/ui/common';
import s from './cart-items.module.scss';

export const CartItemsSkeleton = () => {
  return (
    <div className={s.loaderWrapper}>
      <Loader
        color='dark'
        size='md'
      />
    </div>
  );
};
