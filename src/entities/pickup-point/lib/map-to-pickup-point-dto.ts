import type { PrismaPickupPoint } from '@/src/shared/api';
import type { PickupPointDto } from '../model/types';

export const mapToPickupPointDto = (
  pickupPoint: PrismaPickupPoint,
): PickupPointDto => {
  return {
    id: pickupPoint.id,
    type: pickupPoint.type,
    name: pickupPoint.name || undefined,
    address: pickupPoint.address,
    workingDays: pickupPoint.workingDays,
    workingHours: pickupPoint.workingHours,
    city: pickupPoint.city,
    phone: pickupPoint.phone || undefined,
    description: pickupPoint.description || undefined,
    geocode: [pickupPoint.latitude, pickupPoint.longitude],
    isActive: pickupPoint.isActive,
  };
};
