import { cn } from '@/src/shared/lib';
import { Heading } from '../heading';
import type { TableItem } from './types';
import s from './table.module.scss';

export const Table = ({
  className,
  title,
  showTitle,
  items,
}: {
  className?: string;
  title: string;
  showTitle?: boolean;
  items: TableItem[];
}) => {
  return (
    <table className={cn(s.table, className)}>
      <Heading
        tag='caption'
        variant='h3'
        className={cn(s.title, {
          'visually-hidden': showTitle,
        })}
      >
        {title}
      </Heading>

      <tbody>
        {items.length === 0 ? (
          <tr>
            <td colSpan={2}>Таблица пуста</td>
          </tr>
        ) : (
          items.map(({ id, name, value }, index) => (
            <tr
              className={s.row}
              key={id ?? `${name}-${index}`}
            >
              <th
                scope='row'
                className={cn(s.cell, s.cellHeader)}
              >
                {name}
              </th>
              <td className={s.cell}>{value}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};
