'use client';

import { type StyleSpecification } from 'maplibre-gl';

/**
 * Fetches a MapLibre map style JSON from URL, caches the result in memory,
 * and replaces `text-field` expressions in symbol layers with Russian-language ones (`name:ru` / `name_ru`).
 *
 * @param styleUrl Direct URL to the Style JSON.
 * @returns A promise resolving to the localized MapLibre style specification object.
 */

let cachedStylePromise: Promise<StyleSpecification> | null = null;

export function getLocalizedMapStyle(
  styleUrl: string,
): Promise<StyleSpecification> {
  if (!cachedStylePromise) {
    cachedStylePromise = fetch(styleUrl)
      .then((res) => res.json())
      .then((style: StyleSpecification) => ({
        ...style,
        layers: style.layers.map((layer) => {
          if (layer.type === 'symbol' && layer.layout?.['text-field']) {
            return {
              ...layer,
              layout: {
                ...layer.layout,
                'text-field': [
                  'coalesce',
                  ['get', 'name:ru'],
                  ['get', 'name_ru'],
                  ['get', 'name'],
                ],
              },
            };
          }
          return layer;
        }) as StyleSpecification['layers'],
      }))
      .catch((err) => {
        cachedStylePromise = null;
        throw err;
      });
  }

  return cachedStylePromise;
}
