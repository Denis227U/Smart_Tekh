import { PAYMENT_HINTS, PAYMENT_METHOD_LABELS } from '../../model/constants';
import type { OrderPaymentView } from '../../model/types';
import s from './payment-preview.module.scss';

export const PaymentPreview = ({
  payment,
}: {
  payment: OrderPaymentView | null;
}) => {
  if (!payment) return null;

  const methodLabel =
    PAYMENT_METHOD_LABELS[payment.paymentMethod] || payment.paymentMethod;

  const hintText = PAYMENT_HINTS[payment.paymentMethod];

  return (
    <div className={s.previewWrapper}>
      <p className={s.previewMethodTitle}>{methodLabel}</p>
      {hintText && <p className={s.previewHint}>{hintText}</p>}
    </div>
  );
};
