"use client";

import { Clock, IndianRupee, ParkingSquare, TrendingUp } from "lucide-react";
import { KpiCard } from "@/components/common/KpiCard";
import { formatMoney } from "@/lib/format";
import type { StatsData } from "@/types/reports";

interface Props {
  stats: StatsData | null;
  loading: boolean;
  days: number;
  avgRevenuePerDay: number;
  rangeRevenue: number;
  liveRevenue: number;
}

export function StatCards({ stats, loading, days, avgRevenuePerDay, rangeRevenue, liveRevenue }: Props) {
  const v = loading ? "…" : "";
  return (
    <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <KpiCard icon={<ParkingSquare size={26} strokeWidth={3} />} label="Total Bookings" value={v || String(stats?.summary.totalBookings ?? 0)} bg="bg-secondary" text="text-text-950" />
      <KpiCard icon={<IndianRupee size={26} strokeWidth={3} />} label={`Revenue (${days}d)`} value={v || formatMoney(rangeRevenue)} bg="bg-primary" text="text-primary-foreground" />
      <KpiCard icon={<TrendingUp size={26} strokeWidth={3} />} label="Live Revenue (now)" value={v || formatMoney(liveRevenue)} bg="bg-text-50" text="text-text-950" />
      <KpiCard icon={<Clock size={26} strokeWidth={3} />} label="Avg Revenue / Day" value={v || formatMoney(Math.round(avgRevenuePerDay))} bg="bg-secondary" text="text-text-950" />
    </div>
  );
}
