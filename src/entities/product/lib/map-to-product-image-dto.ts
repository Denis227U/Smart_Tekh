import type { ProductImageDto } from '../model/types';

export const mapToProductImageDto = (img: ProductImageDto) => ({
  id: img.id,
  url: img.url,
  thumbnail: img.thumbnail ?? '',
  alt: img.alt ?? 'Product image',
});
