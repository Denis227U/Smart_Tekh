/**
 * Converts a Date object or an ISO string from Prisma into "DD month YYYY" format.
 * @param date - The date as a string, Date object, null, or undefined.
 * @returns A formatted string like "07 июня 2021" or an empty string.
 */
export const formatToLongDate = (
  date: Date | string | null | undefined,
): string => {
  if (!date) return '';

  const parsedDate = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(parsedDate.getTime())) return '';

  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
    .format(parsedDate)
    .replace(' г.', '');
};
