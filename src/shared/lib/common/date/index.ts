const parseDate = (
  date: Date | string | number | null | undefined,
): Date | null => {
  if (!date) return null;
  const parsed =
    typeof date === 'string' || typeof date === 'number'
      ? new Date(date)
      : date;
  return isNaN(parsed.getTime()) ? null : parsed;
};

const longDateFormatter = new Intl.DateTimeFormat('ru-RU', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
});

const weekdayFormatter = new Intl.DateTimeFormat('ru-RU', {
  weekday: 'long',
});

/**
 * Formats a date into a "DD month YYYY" (e.g., "07 июня 2021").
 * @param date - The date to format.
 */
export const formatToLongDate = (
  date: Date | string | number | null | undefined,
): string => {
  const parsed = parseDate(date);
  if (!parsed) return '';

  return longDateFormatter.format(parsed).replace(/\s*г\.?$/, '');
};

/**
 * Serializes a date into a strict YYYY-MM-DD string representation.
 * @param date - The date to format.
 */
export const serializeDate = (
  date: Date | string | number | null | undefined,
): string => {
  const parsed = parseDate(date);
  if (!parsed) return '';

  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, '0');
  const day = String(parsed.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

/**
 * Formats a date into a relative text format (e.g., "сегодня, 25 мая 2026").
 * @param date - The date to format.
 * @param baseDate - The reference point in time ("now"). Defaults to the current date and time.
 */
export const formatToTextDate = (
  date: Date | string | number | null | undefined,
  baseDate: Date = new Date(),
): string => {
  const parsed = parseDate(date);
  if (!parsed) return '';

  const today = new Date(baseDate);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const dDate = parsed.toDateString();

  let prefix = '';
  if (dDate === today.toDateString()) {
    prefix = 'сегодня';
  } else if (dDate === tomorrow.toDateString()) {
    prefix = 'завтра';
  } else {
    prefix = weekdayFormatter.format(parsed);
  }

  const mainDate = longDateFormatter.format(parsed);
  return `${prefix}, ${mainDate}`;
};
