import { ProductCommentsCount, type ProductDto } from '@/src/entities/product';
import { Button } from '@/src/shared/ui/client';
import { Heading, Icon, Rating } from '@/src/shared/ui/common';
import { PRODUCT_DELIVERY_INFO } from '../../model/constants';
import { ProductDeliveryInfo } from '../product-delivery-info/product-delivery-info';
import s from './product-details-content.module.scss';

export const ProductDetailsContent = ({ product }: { product: ProductDto }) => {
  const { id, title, rating, price, oldPrice, discount, reviewsCount } =
    product;

  return (
    <>
      <Heading
        tag='h1'
        variant='h1'
        id='product-info-title'
        className={s.title}
      >
        {title}
      </Heading>

      <div className={s.grid}>
        <div className={s.review}>
          <Rating
            id={id}
            value={rating}
          />

          <ProductCommentsCount count={reviewsCount} />
        </div>

        <div className={s.prices}>
          {oldPrice && <span className={s.priceOld}>{oldPrice}</span>}
          <span className={s.priceCurrent}>{price}</span>
          {Boolean(discount) && (
            <div className={s['product-info__discount']}>-{discount}%</div>
          )}
        </div>

        <div className={s.actionsFirst}>
          <Button variant='outline-gray'>
            <Icon name='Like' />
          </Button>

          <Button variant='outline-gray'>
            <Icon name='Chart' />
          </Button>
        </div>

        <div className={s.actionsSecond}>
          <Button variant='outline'>Купить в 1 клик</Button>

          <Button variant='main'>В корзину</Button>
        </div>
      </div>

      <ProductDeliveryInfo
        className={s.footer}
        deliveryText={PRODUCT_DELIVERY_INFO.DELIVERY.description}
        paymentText={PRODUCT_DELIVERY_INFO.PAYMENT.description}
      />
    </>
  );
};
