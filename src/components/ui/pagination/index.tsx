'use client';

import { CaretLeft, CaretRight } from '@phosphor-icons/react';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const buttonClass = `flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-200 
    text-black transition disabled:cursor-not-allowed disabled:opacity-40 hover:bg-black 
    hover:text-white disabled:hover:bg-inherit disabled:hover:text-inherit`;

  return (
    <div className="flex items-center justify-center gap-4">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
        className={buttonClass}
      >
        <CaretLeft size={18} />
      </button>
      <span className="text-sm text-gray-600">
        Page <span className="font-semibold text-black">{page}</span> of {totalPages}
      </span>
      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Next page"
        className={buttonClass}
      >
        <CaretRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;
