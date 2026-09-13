"use client";

import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartSkeleton } from "@/components/common/ChartState";
import type { DailyPoint } from "@/types/reports";

interface Props {
  daily: DailyPoint[];
  loading: boolean;
}

export function RevenueChart({ daily, loading }: Props) {
  const data = daily.map((d) => ({
    label: new Date(`${d.day}T00:00:00`).toLocaleDateString("en-IN", { day: "2-digit", month: "short" }),
    bookings: Number(d.bookings || 0),
    revenue: Number(d.revenue || 0),
  }));
  return (
    <div className="mt-5 border-4 border-black bg-background shadow-[5px_5px_0px_black]">
      <div className="flex items-center justify-between border-b-4 border-black bg-secondary px-4 py-3">
        <h2 className="text-lg font-black uppercase text-text-950">Daily Revenue</h2>
        <span className="text-xs font-black uppercase text-text-600">{daily.length} days</span>
      </div>
      <div className="p-4">
        {loading ? <ChartSkeleton height={260} /> : (
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={data} margin={{ top: 10, right: 20, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="var(--color-text-300)" />
              <XAxis dataKey="label" tick={{ fontSize: 11, fontWeight: 700 }} tickLine={false} />
              <YAxis yAxisId="left" tick={{ fontSize: 11, fontWeight: 700 }} tickLine={false} allowDecimals={false} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fontWeight: 700 }} tickLine={false} />
              <Tooltip contentStyle={{ border: "3px solid black", borderRadius: 0, fontWeight: 700 }} />
              <Legend wrapperStyle={{ fontWeight: 800, textTransform: "uppercase", fontSize: 12 }} />
              <Line yAxisId="left" type="monotone" dataKey="bookings" name="Bookings" stroke="var(--color-primary)" strokeWidth={3} dot={false} />
              <Line yAxisId="right" type="monotone" dataKey="revenue" name="Revenue (₹)" stroke="var(--color-warning)" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
