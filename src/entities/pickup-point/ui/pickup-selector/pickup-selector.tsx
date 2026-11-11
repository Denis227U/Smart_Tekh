'use client';

import { cn } from '@/src/shared/lib';
import { FieldRadio } from '@/src/shared/ui/client';
import { Loader } from '@/src/shared/ui/common';
import { PickupAddressLabel } from './pickup-address-label';
import type { PickupPointDto } from '../../model/types';
import s from './pickup-selector.module.scss';

export const PickupSelector = ({
  points,
  value,
  name,
  onChange,
  isLoading,
  error,
  height = '340px',
}: {
  points: PickupPointDto[];
  value?: string;
  name: string;
  onChange: (id: string) => void;
  isLoading?: boolean;
  error: boolean;
  height?: string;
}) => {
  if (isLoading) {
    return (
      <div
        className={s.loader}
        style={{ '--pickup-selector-height': height } as React.CSSProperties}
      >
        <Loader color='main' />
        <span>Загрузка списка пунктов выдачи...</span>
      </div>
    );
  }

  const radioOptions = points.map((item) => ({
    value: item.id,
    label: () => (
      <PickupAddressLabel
        address={item.address}
        workingDays={item.workingDays}
        workingHours={item.workingHours}
      />
    ),
  }));

  return (
    <div
      className={s.pickupWrapper}
      style={{ '--pickup-selector-height': height } as React.CSSProperties}
    >
      <fieldset className={s.pickupFieldset}>
        <legend className='visually-hidden'>Выберите пункт выдачи</legend>

        <span className={s.pickupDescription}>
          Товар доступен в {points.length} магазинах
        </span>

        <div className={cn(s.list, 'custom-scroll')}>
          <FieldRadio
            name={name}
            variant='simple'
            className={s.pointsList}
            options={radioOptions}
            value={value}
            onChange={(val) => onChange(val as string)}
            error={error}
          />
        </div>
      </fieldset>

      <div className={s.mapWrapper}>
        <div className={s.mockMap}>
          Карта (Выбрано:{' '}
          {points.find((p) => p.id === value)?.address || 'Ничего'})
        </div>
      </div>
    </div>
  );
};
