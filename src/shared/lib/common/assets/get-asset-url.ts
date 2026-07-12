import { ASSETS_BASE_URL } from '@/src/shared/config';

/**
 * Generates a URL path for a static asset.
 *
 * @example getAssetUrl('images', 'avatar.png');
 * // Returns: "https://site.com/images/avatar.png"
 *
 * @example getAssetUrl('images', 'avatar.png', false);
 * // Returns: "images/avatar.png" (relative path)
 *
 * @param {string} [folder] - The directory name or nested folder path.
 * @param {string} [filename] - The specific file name with its extension.
 * @param {boolean} [withBaseUrl=true] - Determines whether to prepend the `ASSETS_BASE_URL`.
 * @returns {string} The constructed asset path with parts joined by a forward slash.
 */
export const getAssetUrl = (
  folder?: string,
  filename?: string,
  withBaseUrl: boolean = true,
) => {
  const parts = [withBaseUrl ? ASSETS_BASE_URL : null, folder, filename];
  return parts.filter(Boolean).join('/');
};
