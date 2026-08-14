import { Heading } from '@/src/shared/ui/common';
import s from './product-description.module.scss';

export const ProductDescription = ({
  title,
  description,
}: {
  title: string;
  description: string | null;
}) => {
  if (!description) {
    return <p className={s.empty}>Описание товара временно отсутствует.</p>;
  }

  return (
    <div aria-labelledby='product-tabs-description'>
      <Heading
        tag='h2'
        variant='h3'
        id='product-tabs-description'
        className={s.title}
      >
        Описание «{title}»
      </Heading>

      <div className={s.text}>
        <p>{description}</p>
      </div>
    </div>
  );
};
