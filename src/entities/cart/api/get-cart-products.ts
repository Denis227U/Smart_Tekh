'use server';

import { prisma } from '@/src/shared/api';
import { mapProductToCartItemDto } from '../lib/map-to-cart-dto';

export const getCartProducts = async (productIds: string[]) => {
  try {
    if (!productIds || productIds.length === 0) {
      return { success: true, products: [] };
    }

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
      select: {
        id: true,
        title: true,
        slug: true,
        price: true,
        oldPrice: true,
        stock: true,
        coverThumbnail: true,
        coverImageAlt: true,
      },
    });

    return {
      success: true,
      products: products.map(mapProductToCartItemDto),
    };
  } catch (error) {
    console.error('Ошибка при получении товаров для корзины:', error);
    return {
      success: false,
      error: 'Не удалось получить актуальные данные товаров',
    };
  }
};
