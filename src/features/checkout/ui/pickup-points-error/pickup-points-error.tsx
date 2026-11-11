import { CSSProperties } from 'react';
import { Button } from '@/src/shared/ui/client';
import s from './pickup-points-error.module.scss';

export const PickupPointsError = ({
  message,
  onRetry,
  height,
}: {
  message: string;
  onRetry: () => void;
  height?: string | number;
}) => {
  return (
    <div
      className={s.errorStateBlock}
      role='alert'
      style={{ '--pickup-block-height': height } as CSSProperties}
    >
      <span className={s.errorIcon}>⚠️</span>
      <div className={s.errorTextWrapper}>
        <p className={s.errorMessageTitle}>Ошибка загрузки данных</p>
        <p className={s.errorMessageText}>{message}</p>
      </div>

      <Button
        type='button'
        variant='outline'
        onClick={onRetry}
        className={s.retryButton}
      >
        Повторить попытку
      </Button>
    </div>
  );
};
