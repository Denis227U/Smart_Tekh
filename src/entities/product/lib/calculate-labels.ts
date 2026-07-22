import type { PrismaProduct } from '@/src/shared/api';
import { LABEL_CONFIG } from '../model/constants';
import type { LabelType } from '../model/types';

/**
 * Calculates marketing labels for a product based on its characteristics
 *
 * * Function checks product against four criteria:
 * - `NEW`: product was created recently
 * - `SALE`: product has a discount above minimum
 * - `GOOD_PRICE`: product has a high rating and a discount
 * - `HIT`: product has a large number of pageviews
 * - `DISCOUNT`: product has a discount
 */
export const calculateLabels = (product: PrismaProduct): LabelType[] => {
  const labels: LabelType[] = [];
  const createdDate = new Date(product.createdAt).getTime();
  const now = Date.now();

  // NEW
  const msPerDay = 24 * 60 * 60 * 1000;
  const daysToMs = LABEL_CONFIG.NEW.days * msPerDay;
  const isNew = now - createdDate < daysToMs;
  if (isNew) labels.push('NEW');

  // SALE
  const isOnSale = product.discount >= LABEL_CONFIG.SALE.minDiscount;
  if (isOnSale) labels.push('SALE');

  // GOOD_PRICE
  const isGoodPrice =
    Number(product.rating) >= LABEL_CONFIG.GOOD_PRICE.minRating &&
    product.discount > LABEL_CONFIG.GOOD_PRICE.minDiscount;
  if (isGoodPrice) labels.push('GOOD_PRICE');

  // HIT
  const isHit = product.views >= LABEL_CONFIG.HITS.minViews;
  if (isHit) labels.push('HIT');

  // DISCOUNT
  const isDiscount = product.discount > 0;
  if (isDiscount) labels.push('DISCOUNT');

  return labels;
};
