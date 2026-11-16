import { type RecipientData } from '@/src/features/checkout';
import s from './recipient-preview.module.scss';

export const RecipientPreview = ({
  recipient,
}: {
  recipient: RecipientData | null;
}) => {
  if (!recipient) return null;

  const fullName =
    `${recipient.recipientFirstname} ${recipient.recipientLastname}`.trim();

  return (
    <div className={s.previewWrapper}>
      <p className={s.previewFullName}>{fullName}</p>
      <p className={s.previewContacts}>
        {recipient.recipientPhone}, {recipient.recipientEmail}
      </p>
      {recipient.recipientNoCall && (
        <p className={s.previewNoCall}>Без звонка для подтверждения заказа</p>
      )}
    </div>
  );
};
