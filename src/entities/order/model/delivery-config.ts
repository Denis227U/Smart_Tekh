import { CityCode } from '@/src/shared/api/enums';

export const DELIVERY_CONFIG = {
  FREE_THRESHOLD: 20000, // Free shipping for orders over 20 000 ₽
  EVENING_SURCHARGE: 300, // Surcharge for the evening delivery slot
  DAYS_AHEAD: 7, // Number of days available for selection
  CUTOFF_HOUR: 20, // Cutoff hour (20:00) for next-day delivery
  CITY_RATES: {
    MO: 600,
    SP: 550,
    KZ: 460,
  } satisfies Record<CityCode, number>,
} as const;
