import type { PickupPointDto } from '../model/types';

export const getLngLat = (point: PickupPointDto): [number, number] => {
  const [lat, lng] = point.geocode;
  return [lng, lat];
};
