import React, { Dispatch, SetStateAction } from 'react';

import styles from './Pagination.module.scss';
import { usePagination } from '../../utils/usePagination';

type PaginationProps = {
  className?: string;
  onPageChange: Dispatch<SetStateAction<any>>;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
};

export const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}: PaginationProps) => {
  const DOTS = '…';
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (!paginationRange) return <></>;
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <div className={`${styles.paginationContainer}`}>
      <div
        className={`${styles.paginationItem} ${
          currentPage === 1 ? styles.disabled : ''
        }`}
        onClick={onPrevious}
      >
        <div className={`${styles.arrow} ${styles.left}`}></div>
      </div>
      {paginationRange.map((pageNumber: any) => {
        if (pageNumber === DOTS) {
          return (
            <div className={`${styles.paginationItem} ${styles.dots}`}>
              <span> &#8230;</span>
            </div>
          );
        }

        return (
          <div
            className={`${styles.paginationItem} ${
              pageNumber === currentPage ? styles.selected : ''
            }`}
            onClick={() => onPageChange(pageNumber)}
            key={pageNumber}
          >
            <span>{pageNumber}</span>
          </div>
        );
      })}
      <div
        className={`${styles.paginationItem} ${
          currentPage === lastPage ? styles.disabled : ''
        }`}
        onClick={onNext}
      >
        <div className={`${styles.arrow} ${styles.right}`}></div>
      </div>
    </div>
  );
};
