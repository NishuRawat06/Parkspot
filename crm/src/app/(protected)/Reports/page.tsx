"use client";

import { Download } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { ReportFilters } from "@/components/reports/ReportFilters";
import { ReportSummary } from "@/components/reports/ReportSummary";
import { RevenueChart } from "@/components/reports/RevenueChart";
import { VehicleTable } from "@/components/reports/VehicleTable";
import { TopCustomers } from "@/components/reports/TopCustomers";
import { useReport } from "@/hooks/useReport";

export default function Page() {
  const r = useReport();
  const subtitle = r.report
    ? `${r.report.range.from} → ${r.report.range.to} · ${r.report.range.days} days`
    : "Pick a range to generate a report";
  return (
    <main className="min-h-screen w-full bg-background p-4 md:p-6">
      <PageHeader
        eyebrow="Parking Management / Reports"
        title="Reports"
        subtitle={subtitle}
        action={
          <>
            <ReportFilters days={r.days} onDaysChange={r.setDays} from={r.from} to={r.to} today={r.today} onFromChange={r.setFrom} onToChange={r.setTo} onApply={r.applyRange} />
            <button onClick={r.exportCsv} disabled={!r.report} className="flex h-14 items-center gap-2 border-4 border-black bg-primary px-4 font-black uppercase text-primary-foreground shadow-[5px_5px_0px_black] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_black] disabled:cursor-not-allowed disabled:opacity-50">
              <Download size={20} strokeWidth={3} />
              CSV
            </button>
          </>
        }
      />
      {r.error && (
        <div className="mt-5 border-4 border-black bg-error px-5 py-4 font-black uppercase text-error-text shadow-[4px_4px_0px_black]">
          Failed to load report. Is the backend server running?
        </div>
      )}
      <ReportSummary report={r.report} loading={r.loading} totalLocations={r.totalLocations} totalSlots={r.totalSlots} />
      <RevenueChart daily={r.report?.daily ?? []} loading={r.loading} />
      <VehicleTable rows={r.report?.vehicleTypes ?? []} rangeDays={r.report?.range.days ?? 0} loading={r.loading} />
      <TopCustomers customers={r.report?.topCustomers ?? []} loading={r.loading} />
    </main>
  );
}
