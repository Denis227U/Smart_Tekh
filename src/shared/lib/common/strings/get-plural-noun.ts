/**
 * Returns the correct plural form of a noun based on the provided number.
 *
 * @param count - The number of items
 * @param one - Form for 1 (e.g., 'товар')
 * @param few - Form for 2, 3, 4 (e.g., 'товара')
 * @param many - Form for 5-9, 0, and most other numbers (e.g., 'товаров')
 */
export const getPluralNoun = (
  count: number,
  one: string,
  few: string,
  many: string,
): string => {
  const absoluteCount = Math.abs(count) % 100;
  const lastDigit = absoluteCount % 10;

  if (absoluteCount > 10 && absoluteCount < 20) {
    return many;
  }
  if (lastDigit > 1 && lastDigit < 5) {
    return few;
  }
  if (lastDigit === 1) {
    return one;
  }

  return many;
};
