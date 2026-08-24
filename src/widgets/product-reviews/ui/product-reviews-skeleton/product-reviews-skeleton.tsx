import { Loader } from '@/src/shared/ui/common';
import s from './product-reviews-skeleton.module.scss';

export const ProductReviewsSkeleton = () => {
  return (
    <div className={s.wrapper}>
      <Loader
        color='dark'
        size='lg'
      />
    </div>
  );
};
