/**
 * Finds all focusable elements inside the container.
 * @param container The parent element to search within.
 * @returns An array of all focusable elements found.
 */
export const getFocusableChildren = (container: HTMLElement): HTMLElement[] => {
  const focusableSelector =
    'a[href]:not([inert]), button:not(:disabled):not([inert]), input:not(:disabled):not([inert]), select:not(:disabled):not([inert]), textarea:not(:disabled):not([inert]), [tabindex]:not([tabindex="-1"]):not([inert]), [contenteditable="true"]:not([inert])';

  const elements = container.querySelectorAll<HTMLElement>(focusableSelector);
  return Array.from(elements);
};
