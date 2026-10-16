import type { CartItemDto, CartItemWithProduct } from '../model/types';

export const mapProductToCartItemDto = (
  item: CartItemWithProduct['product'] | CartItemDto['product'],
) => {
  return {
    id: item.id,
    title: item.title,
    slug: item.slug,
    price: Number(item.price),
    oldPrice: item.oldPrice ? Number(item.oldPrice) : null,
    stock: item.stock,
    coverThumbnail: item.coverThumbnail ?? null,
    coverImageAlt: item.coverImageAlt ?? null,
  };
};

export const mapLocalToCartDto = ({
  productId,
  product,
  quantity = 1,
}: {
  productId: string;
  product: CartItemDto['product'];
  quantity: number;
}): CartItemDto => {
  const tempId =
    typeof window !== 'undefined' && window.crypto?.randomUUID
      ? `client-${window.crypto.randomUUID()}`
      : `client-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;

  const qty = Math.min(quantity, product.stock);

  return {
    id: tempId,
    productId,
    quantity: qty,
    product: mapProductToCartItemDto(product),
    totalPrice: qty * Number(product.price),
    createdAt: new Date().toISOString(),
  };
};

export const mapServerToCartDto = (item: {
  id: string;
  productId: string;
  quantity: number;
  product: CartItemWithProduct['product'];
  createdAt: Date;
}): CartItemDto => ({
  id: item.id,
  productId: item.productId,
  product: mapProductToCartItemDto(item.product),
  quantity: item.quantity,
  totalPrice: item.quantity * Number(item.product.price),
  createdAt: item.createdAt.toISOString(),
});
