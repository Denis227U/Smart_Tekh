import { type RefObject, useEffect, useState } from 'react';
import type { MapRef } from 'react-map-gl/maplibre';

/**
 * Manages the expanded modal fullscreen state of the map.
 * Recalculates the WebGL canvas dimensions (`resize`), locks page scrolling,
 * and handles closing via the `Escape` key.
 *
 * @param mapRef Ref to the `MapRef` map instance.
 * @returns An object containing the current `isExpanded` state and control methods `toggleExpanded` and `closeExpanded`.
 */
export const useMapExpand = (mapRef: RefObject<MapRef | null>) => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      mapRef.current?.resize();
    });

    if (!isExpanded) return () => cancelAnimationFrame(rafId);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsExpanded(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [mapRef, isExpanded]);

  const toggleExpanded = () => setIsExpanded((prev) => !prev);
  const closeExpanded = () => setIsExpanded(false);

  return { isExpanded, toggleExpanded, closeExpanded };
};
