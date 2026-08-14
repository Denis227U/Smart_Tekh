import Link from 'next/link';
import { cn } from '@/src/shared/lib';
import { ROUTES } from '@/src/shared/routes';
import { SafeImage } from '@/src/shared/ui/client';
import { Heading, Rating } from '@/src/shared/ui/common';
import { ProductCommentsCount } from '../product-comments-count/product-comments-count';
import { ProductLabels } from '../product-labels/product-labels';
import type { ProductDto } from '../../model/types';
import type { CSSProperties, ReactNode } from 'react';
import s from './product-card.module.scss';

interface ProductCardCustomStyles extends CSSProperties {
  '--price-currency'?: string;
}

type ProductCardProps = Omit<
  ProductDto,
  'description' | 'coverImage' | 'views' | 'createdAt'
> & {
  className?: string;
  titleTag: 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  preload?: boolean;
  addToFavoriteBtn: ReactNode;
  addToCompareBtn: ReactNode;
  quickBuyBtn: ReactNode;
  buyBtn: ReactNode;
};

export const ProductCard = ({
  id,
  title,
  slug,
  categorySlug,
  brand,
  coverThumbnail,
  coverImageAlt,
  rating,
  price,
  oldPrice,
  discount,
  stock,
  titleTag = 'h3',
  className,
  preload = false,
  commentsCount,
  labels,
  addToFavoriteBtn,
  addToCompareBtn,
  quickBuyBtn,
  buyBtn,
}: ProductCardProps) => {
  const styles: ProductCardCustomStyles = {
    '--price-currency': `" ₽"`,
  };

  const productHref = ROUTES.PRODUCT(categorySlug, slug);

  return (
    <article
      className={cn(s.card, className)}
      style={styles}
    >
      <ProductLabels
        labels={labels}
        discount={discount}
      />

      <header className={s.header}>
        <Link
          className={s.imageLink}
          href={productHref}
        >
          <SafeImage
            key={coverThumbnail}
            className={s.image}
            src={coverThumbnail}
            alt={coverImageAlt ?? title}
            title={coverImageAlt ?? title}
            fill
            sizes='(max-width: 768px) 240px, (max-width: 1200px) 324px, 268px'
            preload={preload}
          />
        </Link>

        <span className={s.subtitle}>{brand}</span>

        <Link
          href={productHref}
          className={s.titleLink}
        >
          <Heading
            tag={titleTag}
            variant='h5'
            className={s.title}
          >
            {title}
          </Heading>
        </Link>
      </header>

      <div className={s.reviewBlock}>
        <Rating
          id={id}
          value={rating}
        />

        <ProductCommentsCount count={commentsCount} />
      </div>

      <div className={s.priceBlock}>
        {oldPrice && <span className={s.priceOld}>{String(oldPrice)}</span>}
        <span className={s.priceCurrent}>{String(price)}</span>
      </div>

      <div className={s.actions}>
        {addToFavoriteBtn}

        {addToCompareBtn}
      </div>

      <footer className={s.footer}>
        {stock > 0 ? (
          <div className={s.footerActions}>
            {quickBuyBtn}

            {buyBtn}
          </div>
        ) : (
          <span className={s.noStock}>Нет в наличии</span>
        )}
      </footer>
    </article>
  );
};
