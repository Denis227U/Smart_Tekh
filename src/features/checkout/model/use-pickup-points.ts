'use client';

import { useState, useEffect } from 'react';
import { type UseFormGetValues, type UseFormSetValue } from 'react-hook-form';
import { useSetCheckoutCachedPoints } from '@/src/features/checkout/model/actions';
import { getPickupPointsAction } from '@/src/features/checkout/model/get-pickup-points-action';
import { useCheckoutCachedPoints } from '@/src/features/checkout/model/selectors';
import type { PickupPointDto } from '@/src/entities/pickup-point';
import { CityCode, DeliveryType } from '@/src/shared/api/enums';
import type { DeliveryFormSchemaInput } from './types';

/**
 * Custom hook for reactively fetching and caching pickup points
 * when changing the city or selecting pickup delivery in a form.
 *
 * @description
 * - Checks if pickup delivery (`DeliveryType.PICKUP`) is active and the city code is valid.
 * - Retrieves data from the Zustand store if the city was previously loaded; otherwise, calls the `getPickupPointsAction` Server Action.
 * - Derives the pickup points list, loading state, and errors during the render phase scoped to the current `cityCode`, preventing stale data flashes from the previous city and unnecessary re-renders.
 * - Guards against race conditions during rapid city switching via the `isCurrentRequest` flag.
 * - Resets the `pickupPointId` form field if the previously selected pickup point is missing from the new city's list.
 * - Supports manual re-fetching via the `refetch` callback, which increments an internal retry counter to reset error states and trigger a fresh network request.
 *
 * @param {Object} params - Hook parameters.
 * @param params.getValues - Function to read values from `react-hook-form`.
 * @param params.setValue - Function to update values in `react-hook-form`.
 * @param params.deliveryType - Currently selected delivery method.
 * @param params.city - Selected city code (expected to be a `CityCode` enum value).
 *
 * @returns An object containing the pickup points list, loading flag, and error message for the active city.
 */
export const usePickupPoints = ({
  getValues,
  setValue,
  deliveryType,
  city,
}: {
  getValues: UseFormGetValues<DeliveryFormSchemaInput>;
  setValue: UseFormSetValue<DeliveryFormSchemaInput>;
  deliveryType: string | undefined;
  city: string | undefined;
}): {
  pickupPoints: PickupPointDto[];
  isPickupPointsLoading: boolean;
  errorPickupPoints: string | null;
  refetch: () => void;
} => {
  // Associate with city to immediately clear previous pickup points or errors on city change
  const [serverData, setServerData] = useState<{
    city: CityCode;
    points: PickupPointDto[];
  } | null>(null);

  // Retry counter to manually re-trigger the effect
  const [retryCount, setRetryCount] = useState(0);

  const [fetchError, setFetchError] = useState<{
    city: CityCode;
    attempt: number;
    message: string;
  } | null>(null);

  const [completedRequest, setCompletedRequest] = useState<{
    city: CityCode;
    attempt: number;
  } | null>(null);

  const cachedPoints = useCheckoutCachedPoints();
  const setCachedPoints = useSetCheckoutCachedPoints();

  const cityCode = city as CityCode;
  const isCityValid = Object.values(CityCode).includes(cityCode);
  const isPickupActive = deliveryType === DeliveryType.PICKUP && isCityValid;
  const isCached = Boolean(cachedPoints?.[cityCode]);

  const pickupPoints = (() => {
    if (!isPickupActive) return [];
    if (cachedPoints?.[cityCode]) return cachedPoints[cityCode];
    if (serverData?.city === cityCode) return serverData.points;
    return [];
  })();

  const isPickupPointsLoading =
    isPickupActive &&
    !isCached &&
    (completedRequest?.city !== cityCode ||
      completedRequest?.attempt !== retryCount);

  const errorPickupPoints =
    isPickupActive &&
    !isCached &&
    fetchError?.city === cityCode &&
    fetchError?.attempt === retryCount
      ? fetchError.message
      : null;

  const refetch = () => {
    if (!isPickupActive) return;
    setRetryCount((prev) => prev + 1);
  };

  useEffect(() => {
    if (!isPickupActive) return;

    const currentPvzId = getValues('pickupPointId');

    // Scenario A: Data already exists in cache
    if (cachedPoints?.[cityCode]) {
      const cityData = cachedPoints[cityCode];
      const isPointStillValid = cityData.some((p) => p.id === currentPvzId);

      if (!isPointStillValid && currentPvzId) {
        setValue('pickupPointId', '');
      }
      return;
    }

    // Scenario B: Async fetch from server
    let isCurrentRequest = true;

    const fetchPoints = async () => {
      try {
        const data = await getPickupPointsAction(cityCode);

        if (isCurrentRequest) {
          setServerData({ city: cityCode, points: data });
          setCachedPoints(cityCode, data);
          setFetchError(null);

          const isPointStillValid = data.some((p) => p.id === currentPvzId);
          if (!isPointStillValid) {
            setValue('pickupPointId', '');
          }
        }
      } catch (error) {
        console.error(
          'Ошибка выполнения Server Action при загрузке ПВЗ:',
          error,
        );
        if (isCurrentRequest) {
          setFetchError({
            city: cityCode,
            attempt: retryCount,
            message:
              'Не удалось загрузить список пунктов выдачи. Пожалуйста, попробуйте позже.',
          });
        }
      } finally {
        if (isCurrentRequest) {
          // setCompletedCity(cityCode);
          setCompletedRequest({ city: cityCode, attempt: retryCount });
        }
      }
    };

    fetchPoints();

    return () => {
      isCurrentRequest = false;
    };
  }, [
    isPickupActive,
    cityCode,
    retryCount,
    cachedPoints,
    getValues,
    setValue,
    setCachedPoints,
  ]);

  return {
    pickupPoints,
    isPickupPointsLoading,
    errorPickupPoints,
    refetch,
  };
};
