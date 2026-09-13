"use client";

import { ChartSkeleton } from "@/components/common/ChartState";
import type { Booking } from "@/types/reports";

export function RecentBookings({ rows, loading }: { rows: Booking[]; loading: boolean }) {
  return (
    <div className="border-4 border-black bg-background shadow-[5px_5px_0px_black]">
      <div className="flex items-center justify-between border-b-4 border-black bg-secondary px-4 py-3">
        <h2 className="text-lg font-black uppercase text-text-950">Recent Bookings</h2>
        <span className="text-xs font-black uppercase text-text-600">Latest 5</span>
      </div>
      <div className="divide-y-4 divide-black">
        {loading ? <div className="p-4"><ChartSkeleton height={200} /></div>
        : rows.length === 0 ? (
          <div className="p-8 text-center">
            <p className="font-black uppercase text-text-950">No bookings yet</p>
            <p className="mt-1 text-sm font-bold text-text-600">Add a booking to see it here.</p>
          </div>
        ) : rows.map((b) => (
          <div key={b.id} className="flex items-center justify-between px-4 py-3">
            <div className="min-w-0">
              <p className="truncate font-black uppercase text-text-950">{b.user_name}</p>
              <p className="truncate text-xs font-bold uppercase text-text-600">{b.vehicle_number} · {b.vehicle_type}</p>
            </div>
            <div className="ml-3 shrink-0 text-right">
              <p className="font-black text-text-950">₹{b.base_price}/hr</p>
              <p className="text-xs font-bold uppercase text-text-600">{b.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
