import React from "react";

interface PaginationProps {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  limits?: number[];
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

export function Pagination({
  page,
  totalPages,
  total,
  limit,
  limits = [4, 8, 12],
  onPageChange,
  onLimitChange,
}: PaginationProps) {
  return (
    <div className="mt-4 flex flex-col items-center justify-between gap-2 border-t-4 border-black pt-3 sm:flex-row">
      <div className="flex items-center gap-2">
        <p className="text-sm font-black uppercase">Show:</p>
        <select
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          className="cursor-pointer border-4 border-black bg-secondary px-2 py-1 text-sm font-black outline-none"
        >
          {limits.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <p className="text-sm font-bold text-text-600">of {total}</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="border-4 border-black bg-secondary px-3 py-1.5 text-sm font-black uppercase shadow-[3px_3px_0px_black] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_black] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[3px_3px_0px_black]"
        >
          Previous
        </button>
        <div className="border-4 border-black bg-primary px-4 py-1.5 text-sm font-black shadow-[3px_3px_0px_black]">
          {page} / {totalPages}
        </div>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="border-4 border-black bg-secondary px-3 py-1.5 text-sm font-black uppercase shadow-[3px_3px_0px_black] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_black] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:shadow-[3px_3px_0px_black]"
        >
          Next
        </button>
      </div>
    </div>
  );
}
