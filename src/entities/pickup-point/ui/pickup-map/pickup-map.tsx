'use client';

import { CityCode } from '@/src/shared/api/enums';
import { cn } from '@/src/shared/lib';
import { MapMarker, MapView } from '@/src/shared/ui/client';
import { Icon } from '@/src/shared/ui/common';
import { getLngLat } from '../../lib/get-lng-lat';
import { CITY_COORDINATES } from '../../model/constants';
import { PickupPointDto } from '../../model/types';
import s from './pickup-map.module.scss';

interface PickupMapProps {
  points: PickupPointDto[];
  selectedId?: string;
  cityCode?: CityCode;
  onSelect: (id: string) => void;
}

export const PickupMap = ({
  points,
  selectedId,
  cityCode = 'SP',
  onSelect,
}: PickupMapProps) => {
  const activePoint = points.find((p) => p.id === selectedId);
  const center = activePoint
    ? getLngLat(activePoint)
    : CITY_COORDINATES[cityCode];

  const sortedPoints = [...points].sort((a, b) => {
    if (a.id === selectedId) return 1;
    if (b.id === selectedId) return -1;
    return 0;
  });

  return (
    <MapView
      center={center}
      zoom={selectedId ? 12 : 11}
    >
      {sortedPoints.map((point) => {
        const isSelected = point.id === selectedId;

        return (
          <MapMarker
            key={point.id}
            coordinates={getLngLat(point)}
            tooltip={
              isSelected && (
                <div className={s.tooltipContent}>
                  <span className={s.tooltipTitle}>{point.address}</span>
                  {point.workingHours && (
                    <span className={s.tooltipSubtitle}>
                      {point.workingHours}
                    </span>
                  )}
                </div>
              )
            }
            onClick={() => onSelect(point.id)}
          >
            <button
              type='button'
              className={cn(s.pin, isSelected && s.pinActive)}
              aria-label={`Выбрать пункт ${point.address}`}
            >
              <Icon name='LogoShort' />
            </button>
          </MapMarker>
        );
      })}
    </MapView>
  );
};
