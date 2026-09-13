"use client";

import { Loader2, RefreshCw } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCards } from "@/components/dashboard/StatCards";
import { DailyTrend, StatusSplit, VehicleSplit } from "@/components/dashboard/Charts";
import { RecentBookings } from "@/components/dashboard/RecentBookings";
import { useDashboard } from "@/hooks/useDashboard";

export default function Page() {
  const d = useDashboard();
  const theme = { tickStyle: d.tickStyle, tooltipStyle: d.tooltipStyle, chartColors: d.chartColors };
  return (
    <main className="min-h-screen w-full bg-background p-4 md:p-6">
      <PageHeader
        eyebrow="Parking Management / Overview"
        title="Dashboard"
        subtitle="Parking activity at a glance"
        action={
          <>
            <select value={d.days} onChange={(e) => d.setDays(Number(e.target.value))} className="h-14 cursor-pointer border-4 border-black bg-secondary px-4 font-black uppercase text-text-950 shadow-[5px_5px_0px_black] outline-none">
              <option value={7}>Last 7 days</option>
              <option value={14}>Last 14 days</option>
              <option value={30}>Last 30 days</option>
              <option value={90}>Last 90 days</option>
            </select>
            <button onClick={d.getStats} className="flex h-14 items-center gap-2 border-4 border-black bg-primary px-5 font-black uppercase text-primary-foreground shadow-[5px_5px_0px_black] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_black]">
              {d.loading ? <Loader2 size={20} strokeWidth={3} className="animate-spin" /> : <RefreshCw size={20} strokeWidth={3} />}
              Refresh
            </button>
          </>
        }
      />
      {d.error && (
        <div className="mt-5 border-4 border-black bg-error px-5 py-4 font-black uppercase text-error-text shadow-[4px_4px_0px_black]">
          Failed to load dashboard stats. Is the backend server running?
        </div>
      )}
      <StatCards stats={d.stats} loading={d.loading} days={d.days} avgRevenuePerDay={d.avgRevenuePerDay} rangeRevenue={d.rangeRevenue} liveRevenue={d.liveRevenue} />
      <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="xl:col-span-3">
          <DailyTrend data={d.dailyData} days={d.days} loading={d.loading} theme={theme} />
        </div>
        <VehicleSplit data={d.vehicleData} loading={d.loading} theme={theme} />
        <StatusSplit data={d.statusData} loading={d.loading} theme={theme} />
        <RecentBookings rows={d.recent} loading={d.loading} />
      </div>
    </main>
  );
}
