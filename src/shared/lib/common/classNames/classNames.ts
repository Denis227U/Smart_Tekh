import { clsx, type ClassValue } from 'clsx';

/**
 * A utility for convenient management of class names.
 * Accepts strings, conditional objects, arrays, or null/undefined.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
