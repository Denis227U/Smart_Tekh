import { Loader } from '@/src/shared/ui/common';
import s from './order-summary.module.scss';

export const OrderSummarySkeleton = () => {
  return (
    <div className={s.loaderWrapper}>
      <Loader
        color='dark'
        size='md'
      />
    </div>
  );
};
