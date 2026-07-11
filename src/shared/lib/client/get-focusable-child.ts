/**
 * Finds the first focusable element inside the container.
 * @param container The parent element to search within.
 * @returns The first focusable element, or null if none found.
 */
export const getFocusableChild = (
  container: HTMLElement,
): HTMLElement | null => {
  const focusableSelector =
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  const focusable = container.querySelector<HTMLElement>(focusableSelector);
  return focusable;
};
