import { useEffect, useState } from 'react';
import { getLocalizedMapStyle } from './get-localized-map-style';
import type { StyleSpecification } from 'maplibre-gl';

/**
 * Manages the async loading and state of the map style via `getLocalizedMapStyle`.
 * Safely cancels state updates when the component unmounts.
 *
 * @param styleUrl Direct URL to the Style JSON.
 * @returns A MapLibre style specification object, or `undefined` while the style is loading.
 */
export const useMapStyle = (styleUrl: string) => {
  const [mapStyle, setMapStyle] = useState<StyleSpecification>();

  useEffect(() => {
    let isCancelled = false;

    getLocalizedMapStyle(styleUrl)
      .then((style) => {
        if (!isCancelled) {
          setMapStyle(style);
        }
      })
      .catch((err) => {
        console.error('Ошибка загрузки стиля карты:', err);
      });

    return () => {
      isCancelled = true;
    };
  }, [styleUrl]);

  return mapStyle;
};
