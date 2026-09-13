"use client";

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { formatDate } from "@/lib/format";
import type { LocationResponse, ReportData, ReportResponse } from "@/types/reports";

export const REPORT_PRESETS = [
  { label: "7d", days: 7 },
  { label: "30d", days: 30 },
  { label: "90d", days: 90 },
  { label: "1y", days: 365 },
];

export function useReport() {
  const [report, setReport] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [totalLocations, setTotalLocations] = useState(0);
  const [totalSlots, setTotalSlots] = useState(0);
  const [days, setDays] = useState(30);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [today, setToday] = useState("");

  useEffect(() => setToday(formatDate(new Date())), []);

  const getReport = useCallback(
    async (customFrom?: string, customTo?: string) => {
      try {
        setLoading(true);
        setError(false);
        const params = new URLSearchParams();
        if (customFrom && customTo) {
          params.append("from", customFrom);
          params.append("to", customTo);
        } else {
          const fromDate = new Date();
          fromDate.setDate(fromDate.getDate() - days);
          params.append("from", formatDate(fromDate));
          params.append("to", today);
        }
        const res = await axios.get<ReportResponse>(
          `/api/backend/crm/booking/report?${params.toString()}`,
        );
        setReport(res.data?.data || null);
        try {
          const loc = await axios.get<LocationResponse>(
            `/api/backend/crm/location/getall?limit=1000&page=1&offset=0`,
          );
          const data = loc.data?.data;
          setTotalLocations(data?.count ?? 0);
          setTotalSlots((data?.rows ?? []).reduce((s, l) => s + (l.slots ?? 0), 0));
        } catch {
          setTotalLocations(0);
          setTotalSlots(0);
        }
      } catch (err) {
        console.error("Report error:", err);
        setError(true);
        setReport(null);
      } finally {
        setLoading(false);
      }
    },
    [days, today],
  );

  useEffect(() => {
    getReport();
  }, [getReport]);

  const applyRange = () => (from && to ? getReport(from, to) : getReport());

  const exportCsv = () => {
    if (!report) return;
    const lines: string[] = [];
    lines.push(`ParkSpot Report ${report.range.from} to ${report.range.to}`, "");
    lines.push("Daily revenue", "Date,Bookings,Revenue (INR),Parked Hours");
    for (const d of report.daily)
      lines.push(`${d.day},${d.bookings},${d.revenue},${d.parkedHours ?? 0}`);
    lines.push("", "Vehicle types", "Type,Bookings,Revenue (INR),Parked Hours,Avg Hours/Stay,Days Present");
    for (const v of report.vehicleTypes)
      lines.push(`${v.vehicleType},${v.bookings},${v.revenue},${v.parkedHours},${v.avgHoursPerStay},${v.daysPresent}`);
    lines.push("", "Stay durations", "Bucket,Count");
    for (const [k, c] of Object.entries(report.durationBuckets || {})) lines.push(`${k},${c}`);
    lines.push("", "Top customers", "Name,Email,Vehicle,Bookings,Revenue (INR),Parked Hours");
    for (const c of report.topCustomers)
      lines.push(`${c.name},${c.email},${c.vehicleNumber},${c.bookings},${c.revenue},${c.parkedHours}`);
    const url = URL.createObjectURL(new Blob([lines.join("\n")], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `parkspot-report-${report.range.from}-to-${report.range.to}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return { report, loading, error, days, setDays, from, setFrom, to, setTo, today, totalLocations, totalSlots, getReport, applyRange, exportCsv };
}
