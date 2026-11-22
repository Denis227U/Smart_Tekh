'use client';

import { Marker } from 'react-map-gl/maplibre';
import { cn } from '@/src/shared/lib';
import type { MapMarkerProps } from './types';
import type { PropsWithChildren } from 'react';
import s from './map-marker.module.scss';

export const MapMarker = ({
  coordinates,
  isActive = false,
  tooltip,
  onClick,
  children,
}: PropsWithChildren<MapMarkerProps>) => {
  const [lng, lat] = coordinates;

  return (
    <Marker
      longitude={lng}
      latitude={lat}
      anchor='bottom'
      className={cn(isActive && s.activeMarker)}
      onClick={(e) => {
        e.originalEvent.stopPropagation();
        onClick?.();
      }}
    >
      <div className={s.wrapper}>
        {tooltip && <div className={s.tooltip}>{tooltip}</div>}
        {children}
      </div>
    </Marker>
  );
};
