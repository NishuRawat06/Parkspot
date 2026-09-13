import { AlertTriangle } from "lucide-react";

interface BookingStatsProps {
  total: number;
  parked: number;
  exited: number;
  abandoned: number;
}

export function BookingStats({
  total,
  parked,
  exited,
  abandoned,
}: BookingStatsProps) {
  return (
    <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <div className="flex min-w-0 items-center justify-between border-4 border-black bg-secondary px-5 py-4 shadow-[4px_4px_0px_black]">
        <span className="text-sm font-black uppercase text-text-950">
          Total Bookings
        </span>
        <span className="text-3xl font-black text-text-950">{total}</span>
      </div>

      <div className="flex min-w-0 items-center justify-between border-4 border-black bg-primary px-5 py-4 shadow-[4px_4px_0px_black]">
        <span className="text-sm font-black uppercase text-primary-foreground">
          Parked
        </span>
        <span className="text-3xl font-black text-primary-foreground">
          {parked}
        </span>
      </div>

      <div className="flex min-w-0 items-center justify-between border-4 border-black bg-text-50 px-5 py-4 shadow-[4px_4px_0px_black]">
        <span className="text-sm font-black uppercase text-text-950">
          Exited
        </span>
        <span className="text-3xl font-black text-text-950">{exited}</span>
      </div>

      <div className="flex min-w-0 items-center justify-between border-4 border-black bg-warning px-5 py-4 shadow-[4px_4px_0px_black]">
        <div className="flex min-w-0 items-center gap-2">
          <AlertTriangle
            size={20}
            strokeWidth={3}
            className="shrink-0 text-warning-text"
          />
          <span className="truncate text-sm font-black uppercase text-warning-text">
            Abandoned
          </span>
        </div>
        <span className="ml-3 shrink-0 text-3xl font-black text-warning-text">
          {abandoned}
        </span>
      </div>
    </div>
  );
}
