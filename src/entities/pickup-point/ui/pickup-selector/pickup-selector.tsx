'use client';

import { useEffect, useRef } from 'react';
import { PickupMap } from '@/src/entities/pickup-point/ui/pickup-map/pickup-map';
import { CityCode } from '@/src/shared/api/enums';
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
  currentCityCode,
  onChange,
  isLoading,
  error,
  height = '340px',
}: {
  points: PickupPointDto[];
  value?: string;
  name: string;
  currentCityCode?: CityCode;
  onChange: (id: string) => void;
  isLoading?: boolean;
  error: boolean;
  height?: string;
}) => {
  const listRef = useRef<HTMLDivElement>(null);

  // Auto-scroll list when selecting a point on the map
  useEffect(() => {
    if (!value || !listRef.current) return;
    const target = listRef.current.querySelector(`[data-point-id="${value}"]`);
    target?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [value]);

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
        id={item.id}
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

        <div
          ref={listRef}
          className={cn(s.list, 'custom-scroll')}
        >
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

      <PickupMap
        points={points}
        selectedId={value}
        onSelect={onChange}
        cityCode={currentCityCode}
      />
    </div>
  );
};
