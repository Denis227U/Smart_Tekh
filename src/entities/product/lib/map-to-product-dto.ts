import type { PrismaProduct } from '@/src/shared/api';
import { calculateLabels } from './calculate-labels';
import type { ProductDto } from '../model/types';

export const mapToProductDto = (
  product: PrismaProduct & { category?: { slug: string } },
): ProductDto => {
  return {
    id: product.id,
    title: product.title,
    description: product.description,
    slug: product.slug,
    brand: product.brand,
    coverImage: product.coverImage,
    coverThumbnail: product.coverThumbnail,
    coverImageAlt: product.coverImageAlt,
    rating: Number(product.rating),
    price: Number(product.price),
    oldPrice: product.oldPrice ? Number(product.oldPrice) : null,
    discount: product.discount,
    stock: product.stock,
    categorySlug: product.category?.slug ?? 'uncategorized',
    views: product.views,
    commentsCount: product.commentsCount,
    createdAt: product.createdAt,
    labels: calculateLabels(product),
  };
};
