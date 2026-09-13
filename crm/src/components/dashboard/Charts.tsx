"use client";

import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Car } from "lucide-react";
import { ParkingSquare } from "lucide-react";
import { ChartSkeleton, EmptyChart } from "@/components/common/ChartState";

const LEGEND = { fontWeight: 800, textTransform: "uppercase" as const, fontSize: 12 };

interface Theme {
  tickStyle: Record<string, string | number>;
  tooltipStyle: Record<string, string | number>;
  chartColors: string[];
}

interface DailyRow { label: string; bookings: number; revenue: number }
interface NameCount { name: string; count: number }
interface NameValue { name: string; value: number }

function Card({ title, meta, icon, children }: { title: string; meta?: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="border-4 border-black bg-background shadow-[5px_5px_0px_black]">
      <div className="flex items-center justify-between border-b-4 border-black bg-secondary px-4 py-3">
        <h2 className="text-lg font-black uppercase text-text-950">{title}</h2>
        {meta ? <span className="text-xs font-black uppercase text-text-600">{meta}</span> : icon}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

export function DailyTrend({ data, days, loading, theme }: { data: DailyRow[]; days: number; loading: boolean; theme: Theme }) {
  return (
    <Card title="Daily Bookings & Revenue" meta={`Base price billed hourly · last ${days} days`}>
      {loading ? <ChartSkeleton height={300} /> : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 10, right: 20, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="4 4" stroke="var(--color-text-300)" />
            <XAxis dataKey="label" tick={theme.tickStyle} tickLine={false} />
            <YAxis yAxisId="left" tick={theme.tickStyle} tickLine={false} allowDecimals={false} />
            <YAxis yAxisId="right" orientation="right" tick={theme.tickStyle} tickLine={false} />
            <Tooltip contentStyle={theme.tooltipStyle} />
            <Legend wrapperStyle={LEGEND} />
            <Line yAxisId="left" type="monotone" dataKey="bookings" name="Bookings" stroke="var(--color-primary)" strokeWidth={3} dot={{ r: 3, strokeWidth: 2, fill: "var(--color-text-950)" }} activeDot={{ r: 5 }} />
            <Line yAxisId="right" type="monotone" dataKey="revenue" name="Parking Revenue (₹)" stroke="var(--color-warning)" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}

export function VehicleSplit({ data, loading, theme }: { data: NameCount[]; loading: boolean; theme: Theme }) {
  return (
    <Card title="Bookings by Vehicle Type" icon={<Car size={20} strokeWidth={3} className="text-primary" />}>
      {loading ? <ChartSkeleton height={280} /> : data.length === 0 ? <EmptyChart /> : (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} margin={{ top: 10, right: 20, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="4 4" stroke="var(--color-text-300)" vertical={false} />
            <XAxis dataKey="name" tick={theme.tickStyle} tickLine={false} />
            <YAxis tick={theme.tickStyle} tickLine={false} allowDecimals={false} />
            <Tooltip cursor={{ fill: "var(--color-text-100)" }} contentStyle={theme.tooltipStyle} />
            <Bar dataKey="count" name="Bookings" fill="var(--color-primary)" stroke="var(--color-text-950)" strokeWidth={2} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}

export function StatusSplit({ data, loading, theme }: { data: NameValue[]; loading: boolean; theme: Theme }) {
  return (
    <Card title="Bookings by Status" icon={<ParkingSquare size={20} strokeWidth={3} className="text-primary" />}>
      {loading ? <ChartSkeleton height={280} /> : data.length === 0 ? <EmptyChart /> : (
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={95} paddingAngle={2} stroke="var(--color-text-950)" strokeWidth={2}>
              {data.map((e, i) => <Cell key={e.name} fill={e.name.toLowerCase() === "abandoned" ? "var(--color-warning)" : theme.chartColors[i % theme.chartColors.length]} />)}
            </Pie>
            <Tooltip contentStyle={theme.tooltipStyle} />
            <Legend wrapperStyle={LEGEND} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}
