import { CityCode, DeliveryType } from '@/src/shared/api/enums';
import { CITY_LABELS } from '@/src/shared/config';
import { formatToTextDate } from '@/src/shared/lib';
import { TIMES } from '../../model/constants';
import type { OrderDeliveryView } from '../../model/types';
import s from './delivery-preview.module.scss';

export const DeliveryPreview = ({
  delivery,
}: {
  delivery: OrderDeliveryView | null;
}) => {
  if (!delivery) return null;

  if (delivery.deliveryType === DeliveryType.PICKUP) {
    return (
      <div className={s.previewWrapper}>
        <p className={s.previewMethodTitle}>Самовывоз из:</p>
        <p className={s.previewAddress}>
          {delivery.pickupPointAddress || 'Адрес не найден'}
        </p>
        {(delivery.pickupPointWorkingDays ||
          delivery.pickupPointWorkingHours) && (
          <p className={s.previewWorkingHours}>
            {delivery.pickupPointWorkingDays} {delivery.pickupPointWorkingHours}
          </p>
        )}
      </div>
    );
  }

  if (delivery.deliveryType === DeliveryType.DELIVERY) {
    const timeLabel =
      TIMES.find((t) => t.value === delivery.deliveryTime)?.label ||
      delivery.deliveryTime;

    return (
      <div className={s.previewWrapper}>
        <p className={s.previewMethodTitle}>Курьерская доставка:</p>
        <p className={s.previewAddress}>
          г. {CITY_LABELS[delivery.city as CityCode]}, ул. {delivery.street},
          кв. {delivery.apartment}
        </p>
        <p className={s.previewDeliveryTime}>
          {formatToTextDate(delivery.deliveryDate)}, {timeLabel}
        </p>
        {delivery.comment && (
          <p className={s.previewDeliveryComment}>({delivery.comment})</p>
        )}
      </div>
    );
  }

  return null;
};
