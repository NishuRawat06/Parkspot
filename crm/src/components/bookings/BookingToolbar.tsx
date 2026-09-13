import { ArrowDownWideNarrow, ArrowUpNarrowWide, Search } from "lucide-react";

interface BookingToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  sortType: string;
  onSortTypeChange: (value: string) => void;
  sort: string;
  onToggleSort: () => void;
}

export function BookingToolbar({
  search,
  onSearchChange,
  sortType,
  onSortTypeChange,
  sort,
  onToggleSort,
}: BookingToolbarProps) {
  return (
    <div className="mt-5 flex w-full flex-col gap-3 md:flex-row">
      <div className="flex min-w-0 flex-1 items-center border-4 border-black bg-secondary shadow-[4px_4px_0px_black] transition-all focus-within:translate-x-[2px] focus-within:translate-y-[2px] focus-within:shadow-[2px_2px_0px_black]">
        <Search
          size={21}
          strokeWidth={3}
          className="ml-3 shrink-0 text-text-950 sm:ml-4"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="SEARCH NAME, VEHICLE, EMAIL..."
          className="h-12 w-full min-w-0 bg-transparent px-3 text-sm font-bold uppercase text-text-950 outline-none placeholder:text-text-600 sm:h-14 sm:px-4 sm:text-base"
        />
      </div>

      <div className="flex h-12 w-full shrink-0 border-4 border-black bg-secondary shadow-[4px_4px_0px_black] sm:h-14 md:w-auto">
        <select
          value={sortType}
          onChange={(e) => onSortTypeChange(e.target.value)}
          className="h-full min-w-0 flex-1 cursor-pointer bg-secondary px-3 text-sm font-black uppercase text-text-950 outline-none sm:w-[140px]"
        >
          <option value="createdAt">Date</option>
          <option value="base_price">Base Price</option>
          <option value="user_name">Name</option>
          <option value="vehicle_number">Vehicle</option>
        </select>
        <div className="h-full w-12 shrink-0 border-l-4 border-black bg-secondary">
          <button
            type="button"
            onClick={onToggleSort}
            className="flex h-full w-full cursor-pointer items-center justify-center text-text-950 outline-none"
            title={sort === "ASC" ? "Ascending" : "Descending"}
          >
            {sort === "ASC" ? (
              <ArrowUpNarrowWide size={23} strokeWidth={3} />
            ) : (
              <ArrowDownWideNarrow size={23} strokeWidth={3} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
