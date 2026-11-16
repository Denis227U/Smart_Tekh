import { CityCode } from '../api/enums';

export const CITY_LABELS: Record<CityCode, string> = {
  [CityCode.MO]: 'Москва',
  [CityCode.SP]: 'Санкт-Петербург',
  [CityCode.KZ]: 'Казань',
};

export const CITY_KEYS = Object.values(CityCode) as CityCode[];

export const CITY_OPTIONS = CITY_KEYS.map((key) => ({
  value: key,
  label: CITY_LABELS[key],
}));
