'use client';

import { setWorkerUrl } from 'maplibre-gl';
import { type PropsWithChildren, useRef, useState } from 'react';
import Map, { MapRef } from 'react-map-gl/maplibre';
import { cn } from '@/src/shared/lib';
import { Icon } from '@/src/shared/ui/common';
import { useMapCamera } from '@/src/shared/ui/map/use-map-camera';
import { useMapExpand } from '@/src/shared/ui/map/use-map-expand';
import { useMapStyle } from '@/src/shared/ui/map/use-map-style';
import type { MapViewProps } from './types';
import 'maplibre-gl/dist/maplibre-gl.css';
import s from './map-view.module.scss';

// Load Web Worker from `public/` for background tile processing in the browser
if (typeof window !== 'undefined') {
  setWorkerUrl('/maplibre-gl-worker.mjs');
}

const HOST = ['basemaps', 'cartocdn', 'com'].join('.');
const MAP_STYLE_URL = `https://${HOST}/gl/dark-matter-gl-style/style.json`;

export const MapView = ({
  center,
  zoom = 11,
  className,
  children,
}: PropsWithChildren<MapViewProps>) => {
  const mapRef = useRef<MapRef>(null);
  const [isTilesLoaded, setIsTilesLoaded] = useState(false);
  const [lng, lat] = center;

  const mapStyle = useMapStyle(MAP_STYLE_URL);
  const { isExpanded, toggleExpanded, closeExpanded } = useMapExpand(mapRef);
  useMapCamera(mapRef, center, zoom);

  return (
    <>
      {isExpanded && (
        <div
          className={s.backdrop}
          onClick={closeExpanded}
          aria-hidden='true'
        />
      )}

      <div className={cn(s.wrapper, className, isExpanded && s.expanded)}>
        {(!mapStyle || !isTilesLoaded) && (
          <div className={s.skeleton}>Загрузка карты...</div>
        )}

        <button
          type='button'
          className={s.expandButton}
          onClick={toggleExpanded}
          aria-label={isExpanded ? 'Свернуть карту' : 'Развернуть карту'}
          title={isExpanded ? 'Свернуть карту' : 'Развернуть карту'}
        >
          <Icon
            name={isExpanded ? 'Collapse' : 'Expand'}
            size={16}
            aria-hidden='true'
          />
        </button>

        {mapStyle && (
          <Map
            ref={mapRef}
            initialViewState={{
              longitude: lng,
              latitude: lat,
              zoom,
            }}
            style={{ width: '100%', height: '100%' }}
            mapStyle={mapStyle}
            attributionControl={{ compact: true }}
            onLoad={() => setIsTilesLoaded(true)}
          >
            {children}
          </Map>
        )}
      </div>
    </>
  );
};
