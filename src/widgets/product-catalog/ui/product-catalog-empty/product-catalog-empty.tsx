import { Heading } from '@/src/shared/ui/common';
import s from './product-catalog-empty.module.scss';

export const ProductCatalogEmpty = () => {
  return (
    <div className={s.wrapper}>
      <Heading
        tag='h2'
        variant='h5'
      >
        Товары не найдены
      </Heading>
    </div>
  );
};
