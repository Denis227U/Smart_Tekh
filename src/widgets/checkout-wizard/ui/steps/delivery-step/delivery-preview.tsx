import { TIMES, type DeliveryData } from '@/src/features/checkout';
import { CITY_LABELS } from '@/src/entities/pickup-point';
import { CityCode, DeliveryType } from '@/src/shared/api/enums';
import { formatToTextDate } from '@/src/shared/lib';
import s from './delivery-step.module.scss';

export const DeliveryPreview = ({
  delivery,
}: {
  delivery: DeliveryData | null;
}) => {
  if (!delivery) return null;

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
