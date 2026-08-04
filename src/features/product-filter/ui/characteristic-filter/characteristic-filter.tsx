'use client';

import { useCatalogParams } from '@/src/entities/product';
import { FieldCheckbox } from '@/src/shared/ui/client';
import { Heading } from '@/src/shared/ui/common';
import s from './characteristic-filter.module.scss';

export const CharacteristicFilter = ({
  title,
  values,
  showTitle = true,
}: {
  title: string;
  values: { value: string; count: number }[];
  showTitle?: boolean;
}) => {
  const { filters, toggleCharacteristic } = useCatalogParams();

  const currentGroup = filters.characteristics.find((c) => c.name === title);
  const selectedValues = currentGroup?.values ?? [];

  return (
    <div>
      {showTitle && (
        <Heading
          tag='h2'
          variant='h5'
        >
          {title}
        </Heading>
      )}

      <ul className={s.list}>
        {values.length > 0
          ? values.map(({ value, count }) => (
              <li
                className={s.option}
                key={value}
              >
                <FieldCheckbox
                  text={value}
                  checked={selectedValues.includes(value)}
                  onChange={() => toggleCharacteristic(title, value)}
                />

                <span className={s.count}>{count ?? 0}</span>
              </li>
            ))
          : 'Нет опций'}
      </ul>
    </div>
  );
};
