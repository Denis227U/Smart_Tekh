export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /* How many neighbors to show left/right of current */
  siblingCount?: number;
  /* How many pages to show at start and end */
  boundaryCount?: number;
  disabled?: boolean;
};
