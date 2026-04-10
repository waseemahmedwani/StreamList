/**
 * TMDB image sizes:
 * - w185 — cast avatars and small thumbnails
 * - w342 — standard portrait content cards
 * - w780 — detail screen backdrop images
 */

import { TMDB_IMAGE_BASE_URL } from '@env';

export type ImageSize = 'w185' | 'w342' | 'w780';

export function getImageUrl(
  path: string | null,
  size: ImageSize,
): string | null {
  if (path === null) {
    return null;
  }
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}
