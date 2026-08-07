import { useMemo } from 'react';

/**
 * Computes a list of page numbers and 'ellipsis' markers based on
 * the current page, total page count, and boundaries/siblings configuration.
 *
 * @param {Object} params - The pagination configuration.
 * @param {number} params.currentPage - Current page number (1-based).
 * @param {number} params.totalPages - Total number of pages.
 * @param {number} params.siblingCount - Pages to show on each side
 * @param {number} params.boundaryCount - Number of pages to show at start and end
 *
 * @returns {{ pages: (number|'ellipsis')[] }} `pages` - array of pages and 'ellipsis'.
 *
 * @example
 * const { pages } = usePagination({
 *   currentPage: 5,
 *   totalPages: 10,
 *   siblingCount: 1,
 *   boundaryCount: 1
 * });
 * // pages: [1, 'ellipsis', 4, 5, 6, 'ellipsis', 10]
 */
export const usePagination = ({
  currentPage,
  totalPages,
  siblingCount,
  boundaryCount,
}: {
  currentPage: number;
  totalPages: number;
  siblingCount: number;
  boundaryCount: number;
}) => {
  const pages = useMemo(() => {
    if (totalPages <= 0) return [];

    const range = (start: number, end: number) =>
      Array.from({ length: end - start + 1 }, (_, i) => start + i);

    // totalNumbers - minimum number of displayed items
    const totalNumbers = 2 * boundaryCount + 2 * siblingCount + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages <= totalBlocks) {
      return range(1, totalPages);
    }

    const leftBoundary = Math.min(boundaryCount, totalPages);
    const rightBoundary = Math.max(
      totalPages - boundaryCount + 1,
      boundaryCount + 1,
    );

    const leftSiblingStart = Math.max(
      currentPage - siblingCount,
      leftBoundary + 2,
    );
    const leftSiblingEnd = currentPage - 1;

    const rightSiblingStart = currentPage + 1;
    const rightSiblingEnd = Math.min(
      currentPage + siblingCount,
      rightBoundary - 2,
    );

    const items: (number | 'ellipsis')[] = [];

    items.push(...range(1, leftBoundary));

    if (leftSiblingStart > leftBoundary + 1) {
      items.push('ellipsis');
    } else if (leftBoundary + 1 === leftSiblingStart - 1) {
      items.push(leftBoundary + 1);
    }

    items.push(...range(leftSiblingStart, leftSiblingEnd));

    if (currentPage > leftBoundary && currentPage < rightBoundary) {
      items.push(currentPage);
    }

    items.push(...range(rightSiblingStart, rightSiblingEnd));

    if (rightSiblingEnd < rightBoundary - 1) {
      items.push('ellipsis');
    } else if (rightBoundary - 1 === rightSiblingEnd + 1) {
      items.push(rightBoundary - 1);
    }

    items.push(...range(rightBoundary, totalPages));

    return items;
  }, [currentPage, totalPages, siblingCount, boundaryCount]);

  return { pages };
};
