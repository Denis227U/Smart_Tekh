import { cn } from '@/src/shared/lib';
import { PRODUCT_LABEL_MAP } from '../../lib/label-map';
import type { LabelType } from '../../model/types';
import s from './product-labels.module.scss';

export const ProductLabels = ({
  labels,
  discount,
}: {
  labels: LabelType[];
  discount: number;
}) => {
  return (
    <ul className={s.labels}>
      {labels.map((label) => {
        const config = PRODUCT_LABEL_MAP[label];
        if (!config) return null;

        return (
          <li
            key={label}
            className={cn(s.label, s[config.className])}
          >
            {label === 'DISCOUNT' ? `-${discount}%` : config.text}
          </li>
        );
      })}
    </ul>
  );
};
