import { cacheLife, cacheTag } from 'next/cache';
import { prisma } from '@/src/shared/api';
import { CityCode } from '@/src/shared/api/enums';
import { mapToPickupPointDto } from '../lib/map-to-pickup-point-dto';
import type { PickupPointDto } from '../model/types';

export const getPickupPointsByCityCode = async ({
  cityCode,
}: {
  cityCode: CityCode;
}): Promise<PickupPointDto[]> => {
  'use cache';
  cacheLife('days');
  cacheTag('pickup-points', `pickup-points-${cityCode}`);

  const data = await prisma.pickupPoint.findMany({
    where: {
      isActive: true,
      city: cityCode,
    },
    orderBy: {
      address: 'asc', // (ул. А... -> ул. Я...)
    },
  });

  return data.map(mapToPickupPointDto);
};
