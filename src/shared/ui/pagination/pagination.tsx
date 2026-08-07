import { Button } from '@/src/shared/ui/client';
import { Icon } from '@/src/shared/ui/common';
import { PaginationProps } from './types';
import { usePagination } from './use-pagination';
import s from './pagination.module.scss';

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 2,
  boundaryCount = 1,
  disabled = false,
}: PaginationProps) => {
  const { pages } = usePagination({
    currentPage,
    totalPages,
    siblingCount,
    boundaryCount,
  });

  if (totalPages <= 1) return null;

  const handleClick = (page: number) => {
    if (!disabled && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <nav
      aria-label='Пагинация'
      className={s.wrapper}
    >
      <Button
        className={s.arrow}
        variant='outline'
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage <= 1 || disabled}
        aria-label='Предыдущая страница'
      >
        <Icon
          name='ArrowRight'
          aria-hidden='true'
          width={8}
          height={13}
          style={{ rotate: '180deg' }}
        />
      </Button>

      {pages.map((page, index) => {
        if (page === 'ellipsis') {
          return (
            <span
              key={`ellipsis-${index}`}
              className={s.ellipsis}
            >
              …
            </span>
          );
        }

        const isActive = page === currentPage;
        return (
          <Button
            key={page}
            className={s.button}
            data-active={isActive || undefined}
            variant={isActive ? 'main' : 'outline'}
            onClick={() => handleClick(page)}
            disabled={disabled}
            aria-current={isActive ? 'page' : undefined}
            aria-label={`Страница ${page}`}
          >
            {page}
          </Button>
        );
      })}

      <Button
        className={s.arrow}
        variant='outline'
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage >= totalPages || disabled}
        aria-label='Следующая страница'
      >
        <Icon
          name='ArrowRight'
          aria-hidden='true'
          width={8}
          height={13}
        />
      </Button>
    </nav>
  );
};
