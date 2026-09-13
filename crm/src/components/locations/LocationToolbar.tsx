"use client";

import { ArrowDownWideNarrow, ArrowUpNarrowWide, Search } from "lucide-react";

interface LocationToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  sortType: string;
  onSortTypeChange: (value: string) => void;
  sort: string;
  onToggleSort: () => void;
}

export function LocationToolbar({
  search,
  onSearchChange,
  sortType,
  onSortTypeChange,
  sort,
  onToggleSort,
}: LocationToolbarProps) {
  return (
    <div className="flex h-[58px] w-full items-center gap-2">
      <div className="flex h-full min-w-0 flex-1 items-center border-4 border-black bg-secondary shadow-[4px_4px_0px_black] transition-all focus-within:translate-x-[2px] focus-within:translate-y-[2px] focus-within:shadow-[2px_2px_0px_black]">
        <Search
          size={18}
          strokeWidth={3}
          className="ml-2.5 shrink-0 text-text-950"
        />
        <input
          type="text"
          placeholder="Search by address..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-full w-full bg-transparent px-2 text-sm font-bold text-text-950 outline-none placeholder:text-text-600"
        />
      </div>
      <div className="flex h-full shrink-0 items-center border-4 border-black bg-secondary shadow-[4px_4px_0px_black]">
        <select
          value={sortType}
          onChange={(e) => onSortTypeChange(e.target.value)}
          className="h-full w-[90px] cursor-pointer bg-secondary px-1.5 text-lg font-bold text-text-950 outline-none"
        >
          <option value="createdAt">Date</option>
          <option value="slots">Slots</option>
          <option value="basePrice">Base price</option>
        </select>
        <div className="h-full w-[42px] border-l-4 border-black bg-secondary text-text-950">
          <button
            onClick={onToggleSort}
            className="flex h-full w-full cursor-pointer items-center justify-center outline-none"
          >
            {sort === "ASC" ? (
              <ArrowUpNarrowWide size={23} />
            ) : (
              <ArrowDownWideNarrow size={23} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
