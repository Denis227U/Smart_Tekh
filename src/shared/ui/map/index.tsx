'use client';

import dynamic from 'next/dynamic';
import s from './map-view.module.scss';

export const MapView = dynamic(
  () => import('./map-view').then((mod) => mod.MapView),
  {
    ssr: false,
    loading: () => (
      <div className={s.wrapper}>
        <div className={s.skeleton}>Загрузка карты...</div>
      </div>
    ),
  },
);

export { MapMarker } from './map-marker';
