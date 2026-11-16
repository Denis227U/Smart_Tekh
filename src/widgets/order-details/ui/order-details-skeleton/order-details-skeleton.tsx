import { Loader } from '@/src/shared/ui/common';
import s from './order-details-skeleton.module.scss';

export const OrderDetailsSkeleton = () => {
  return (
    <div className={s.wrapper}>
      <Loader
        color='dark'
        size='lg'
      />
    </div>
  );
};
