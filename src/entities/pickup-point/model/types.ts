import { CityCode, PickupPointType } from '@/src/shared/api/enums';

export interface PickupPointDto {
  id: string;
  type: PickupPointType;
  name?: string;
  address: string;
  workingDays: string;
  workingHours: string;
  city: CityCode;
  phone?: string;
  description?: string;
  geocode: [number, number];
  isActive: boolean;
}
