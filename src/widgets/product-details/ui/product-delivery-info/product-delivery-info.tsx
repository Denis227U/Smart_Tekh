import { Heading, Icon } from '@/src/shared/ui/common';
import s from './product-delivery-info.module.scss';

export const ProductDeliveryInfo = ({
  className,
  deliveryText,
  paymentText,
}: {
  className?: string;
  deliveryText: string;
  paymentText: string;
}) => {
  return (
    <div
      className={className}
      aria-labelledby='delivery-and-payment-title'
    >
      <h2
        className='visually-hidden'
        id='delivery-and-payment-title'
      >
        Информация о доставке и оплате
      </h2>

      <ul className={s.list}>
        <li className={s.item}>
          <Icon
            name='Delivery'
            size={24}
            aria-hidden='true'
          />
          <Heading
            tag='h2'
            variant='h6'
            className={s.title}
          >
            Доставка
          </Heading>
          <p className={s.text}>{deliveryText}</p>
        </li>

        <li className={s.item}>
          <Icon
            name='Payment'
            size={24}
            aria-hidden='true'
          />
          <Heading
            tag='h2'
            variant='h6'
            className={s.title}
          >
            Оплата
          </Heading>
          <p className={s.text}>{paymentText}</p>
        </li>
      </ul>
    </div>
  );
};
