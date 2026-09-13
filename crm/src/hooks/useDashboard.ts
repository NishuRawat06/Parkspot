"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import type { Booking, BookingResponse, StatsData, StatsResponse } from "@/types/reports";

export const DEFAULT_CHART_COLORS = ["#7dac53", "#0d1208", "#abd883", "#4d6a2f", "#b3d095", "#668e3e"];
const DEFAULT_TICK = { fontSize: 11, fontWeight: 700, fill: "#668e3e" };
const DEFAULT_TIP = { border: "3px solid black", borderRadius: 0, fontWeight: 700, background: "#f2f7ed" };

export function useDashboard() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [recent, setRecent] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(14);
  const [error, setError] = useState(false);
  const [chartColors, setChartColors] = useState(DEFAULT_CHART_COLORS);
  const [tickStyle, setTickStyle] = useState(DEFAULT_TICK);
  const [tooltipStyle, setTooltipStyle] = useState(DEFAULT_TIP);

  useEffect(() => {
    const style = getComputedStyle(document.documentElement);
    const get = (v: string, f: string) => style.getPropertyValue(v).trim() || f;
    setChartColors([get("--color-primary", "#7dac53"), get("--color-text-950", "#0d1208"), get("--color-secondary", "#abd883"), get("--color-text-700", "#4d6a2f"), get("--color-text-300", "#b3d095"), get("--color-text-600", "#668e3e")]);
    setTickStyle({ fontSize: 11, fontWeight: 700, fill: get("--color-text-600", "#668e3e") });
    setTooltipStyle({ border: `3px solid ${get("--color-text-950", "black")}`, borderRadius: 0, fontWeight: 700, background: get("--color-text-50", "#f2f7ed") });
  }, []);

  const getStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      const [s, r] = await Promise.all([
        axios.get<StatsResponse>(`/api/backend/crm/booking/stats?days=${days}`),
        axios.get<BookingResponse>(`/api/backend/crm/booking/getall?sort=createdAt&order=DESC&limit=5&page=1&offset=0`),
      ]);
      setStats(s.data?.data || null);
      setRecent(r.data?.data?.rows || []);
    } catch (err) {
      console.error("Stats error:", err);
      setError(true);
      setStats(null);
      setRecent([]);
    } finally {
      setLoading(false);
    }
  }, [days]);

  useEffect(() => {
    getStats();
  }, [getStats]);

  const dailyData = useMemo(
    () => (stats?.daily || []).map((d) => ({
      label: new Date(`${d.day}T00:00:00`).toLocaleDateString("en-IN", { day: "2-digit", month: "short" }),
      bookings: Number(d.bookings || 0),
      revenue: Number(d.revenue || 0),
    })),
    [stats],
  );

  const vehicleData = useMemo(
    () => (stats?.byVehicleType || []).map((v) => ({ name: v.key ? v.key.toUpperCase() : "UNKNOWN", count: Number(v.count) })),
    [stats],
  );

  const statusData = useMemo(
    () => (stats?.byStatus || []).map((s) => ({ name: s.key ? s.key.charAt(0).toUpperCase() + s.key.slice(1) : "Unknown", value: Number(s.count) })),
    [stats],
  );

  const rangeRevenue = stats?.summary.windowRevenue ?? 0;
  const liveRevenue = stats?.summary.liveRevenue ?? 0;
  const avgRevenuePerDay = rangeRevenue / (dailyData.length || days || 1);

  return { stats, recent, loading, days, setDays, error, chartColors, tickStyle, tooltipStyle, dailyData, vehicleData, statusData, rangeRevenue, liveRevenue, avgRevenuePerDay, getStats };
}
