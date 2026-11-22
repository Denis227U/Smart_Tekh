import { type RefObject, useEffect, useRef } from 'react';
import type { MapRef } from 'react-map-gl/maplibre';

/**
 * Manages smooth camera transitions (`flyTo`) when the center coordinates or zoom level change.
 * Skips the call if the coordinates and zoom level have not changed relative to the initial ones.
 *
 * @param mapRef Ref to the `MapRef` map instance.
 * @param center Target center coordinates in `[longitude, latitude]` format.
 * @param zoom Target zoom level.
 */
export const useMapCamera = (
  mapRef: RefObject<MapRef | null>,
  center: [number, number],
  zoom: number,
) => {
  const [lng, lat] = center;
  const prevCameraRef = useRef({ lng, lat, zoom });

  useEffect(() => {
    const prev = prevCameraRef.current;

    // coordinates and zoom level match the previous (or initial) ones
    if (prev.lng === lng && prev.lat === lat && prev.zoom === zoom) {
      return;
    }

    if (!mapRef.current) return;

    prevCameraRef.current = { lng, lat, zoom };

    mapRef.current.flyTo({
      center: [lng, lat],
      zoom,
      duration: 700,
    });
  }, [mapRef, lng, lat, zoom]);
};
