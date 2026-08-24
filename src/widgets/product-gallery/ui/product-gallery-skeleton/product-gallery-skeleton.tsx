import { Loader } from '@/src/shared/ui/common';
import s from './product-gallery-skeleton.module.scss';

export const ProductGallerySkeleton = () => {
  return (
    <div className={s.wrapper}>
      <Loader
        color='dark'
        size='lg'
      />
    </div>
  );
};
