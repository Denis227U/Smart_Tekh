'use server';

import type { PickupPointDto } from '@/src/entities/pickup-point';
import { getPickupPointsByCityCode } from '@/src/entities/pickup-point/server';
import type { CityCode } from '@/src/shared/api/prisma/generated/enums';

export async function getPickupPointsAction(
  cityCode: CityCode,
): Promise<PickupPointDto[]> {
  return await getPickupPointsByCityCode({ cityCode });
}
