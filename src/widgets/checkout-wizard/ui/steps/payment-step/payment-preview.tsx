import {
  PAYMENT_METHOD_OPTIONS,
  type PaymentData,
} from '@/src/features/checkout';
import { PAYMENT_HINTS } from '../../../model/constants';
import s from './payment-step.module.scss';

export const PaymentPreview = ({
  payment,
}: {
  payment: PaymentData | null;
}) => {
  if (!payment) return null;

  const methodLabel =
    PAYMENT_METHOD_OPTIONS.find((opt) => opt.value === payment.paymentMethod)
      ?.label || payment.paymentMethod;

  const hintText = PAYMENT_HINTS[payment.paymentMethod];

  return (
    <div className={s.previewWrapper}>
      <p className={s.previewMethodTitle}>{methodLabel}</p>
      {hintText && <p className={s.previewHint}>{hintText}</p>}
    </div>
  );
};
