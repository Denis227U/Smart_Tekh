import { formatToTextDate, serializeDate } from '@/src/shared/lib';
import { DELIVERY_CONFIG } from '../model/delivery-config';
import type { DateOption } from '../model/types';

/**
 * Generates an array of available delivery date options.
 * @param baseDate - Reference point in time (defaults to current time)
 * @param ignoreCutoff - If true, skips the cutoff hour check (useful for server validation buffer)
 */
export const getAvailableDeliveryDates = (
  baseDate: Date = new Date(),
  ignoreCutoff = false,
): DateOption[] => {
  const isAfterCutoff =
    !ignoreCutoff && baseDate.getHours() >= DELIVERY_CONFIG.CUTOFF_HOUR;

  // Delivery starts tomorrow (+1), or day after tomorrow (+2) if past cutoff hour
  const startOffset = isAfterCutoff ? 2 : 1;

  return Array.from({ length: DELIVERY_CONFIG.DAYS_AHEAD }, (_, index) => {
    const targetDate = new Date(baseDate);
    targetDate.setDate(baseDate.getDate() + startOffset + index);

    return {
      value: serializeDate(targetDate),
      label: formatToTextDate(targetDate, baseDate),
    };
  });
};
