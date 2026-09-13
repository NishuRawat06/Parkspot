"use client";

import { Car, Clock, IndianRupee, MapPin, ParkingSquare, TrendingUp, Users } from "lucide-react";
import { KpiCard } from "@/components/common/KpiCard";
import { SectionTitle } from "@/components/common/ChartState";
import { formatHours, formatMoney } from "@/lib/format";
import type { ReportData } from "@/types/reports";

interface Props {
  report: ReportData | null;
  loading: boolean;
  totalLocations: number;
  totalSlots: number;
}

export function ReportSummary({ report, loading, totalLocations, totalSlots }: Props) {
  const v = loading ? "…" : "";
  const s = report?.summary;
  return (
    <>
      <div className="mt-5">
        <SectionTitle dot="bg-text-950" title="Total" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <KpiCard icon={<IndianRupee size={26} strokeWidth={3} />} label="Total Revenue" value={v || formatMoney(s?.rangeRevenue ?? 0)} bg="bg-primary" text="text-primary-foreground" />
          <KpiCard icon={<Car size={26} strokeWidth={3} />} label="Total Bookings" value={v || String(s?.totalBookings ?? 0)} bg="bg-secondary" text="text-text-950" />
          <KpiCard icon={<Clock size={26} strokeWidth={3} />} label="Parked Hours" value={v || formatHours(s?.parkedHours ?? 0)} bg="bg-secondary" text="text-text-950" />
          <KpiCard icon={<TrendingUp size={26} strokeWidth={3} />} label="Avg Hours / Stay" value={v || formatHours(s?.avgHoursPerStay ?? 0)} bg="bg-text-50" text="text-text-950" />
          <KpiCard icon={<MapPin size={26} strokeWidth={3} />} label="Total Locations" value={v || String(totalLocations)} bg="bg-text-50" text="text-text-950" />
          <KpiCard icon={<ParkingSquare size={26} strokeWidth={3} />} label="Total Slots" value={v || String(totalSlots)} bg="bg-text-50" text="text-text-950" />
        </div>
      </div>
      <div className="mt-5">
        <SectionTitle dot="bg-primary" title="Active Bookings" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard icon={<Car size={26} strokeWidth={3} />} label="Active Now" value={v || String(s?.activeNow ?? 0)} bg="bg-primary" text="text-primary-foreground" />
          <KpiCard icon={<IndianRupee size={26} strokeWidth={3} />} label="Live Revenue" value={v || formatMoney(s?.liveRevenue ?? 0)} bg="bg-primary" text="text-primary-foreground" />
          <KpiCard icon={<Car size={26} strokeWidth={3} />} label="Stays In Range" value={v || String(s?.rangeBookings ?? 0)} bg="bg-secondary" text="text-text-950" />
          <KpiCard icon={<Users size={26} strokeWidth={3} />} label="Active Right Now" value={v || String(s?.activeNow ?? 0)} bg="bg-text-50" text="text-text-950" />
        </div>
      </div>
      <div className="mt-5">
        <SectionTitle dot="bg-warning" title="Abandoned Bookings" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard icon={<Car size={26} strokeWidth={3} />} label="Abandoned Count" value={v || String(report?.statusCounts?.abandoned ?? 0)} bg="bg-warning" text="text-warning-text" />
          <KpiCard icon={<IndianRupee size={26} strokeWidth={3} />} label="Range Revenue" value={v || formatMoney(s?.rangeRevenue ?? 0)} bg="bg-text-50" text="text-text-950" />
          <KpiCard icon={<Clock size={26} strokeWidth={3} />} label="Parked Hours" value={v || formatHours(s?.parkedHours ?? 0)} bg="bg-text-50" text="text-text-950" />
          <KpiCard icon={<Users size={26} strokeWidth={3} />} label="Cancelled (all time)" value={v || String(s?.cancelledCount ?? 0)} bg="bg-text-50" text="text-text-950" />
        </div>
      </div>
    </>
  );
}
