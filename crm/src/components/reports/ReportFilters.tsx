"use client";

import { CalendarRange } from "lucide-react";
import { REPORT_PRESETS } from "@/hooks/useReport";

interface Props {
  days: number;
  onDaysChange: (d: number) => void;
  from: string;
  to: string;
  today: string;
  onFromChange: (v: string) => void;
  onToChange: (v: string) => void;
  onApply: () => void;
}

export function ReportFilters({ days, onDaysChange, from, to, today, onFromChange, onToChange, onApply }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex border-4 border-black shadow-[5px_5px_0px_black]">
        {REPORT_PRESETS.map((p) => (
          <button
            key={p.label}
            onClick={() => onDaysChange(p.days)}
            className={`h-14 w-16 cursor-pointer border-r-4 border-black px-2 font-black uppercase outline-none last:border-r-0 ${days === p.days ? "bg-primary text-primary-foreground" : "bg-secondary text-text-950 hover:bg-text-100"}`}
          >
            {p.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2 border-4 border-black bg-secondary px-3 py-2 shadow-[5px_5px_0px_black]">
        <CalendarRange size={20} strokeWidth={3} className="shrink-0 text-text-950" />
        <input type="date" value={from} max={to || today} onChange={(e) => onFromChange(e.target.value)} className="bg-transparent font-black text-text-950 outline-none" suppressHydrationWarning />
        <span className="font-black text-text-600">→</span>
        <input type="date" value={to} min={from} max={today} onChange={(e) => onToChange(e.target.value)} className="bg-transparent font-black text-text-950 outline-none" suppressHydrationWarning />
      </div>
      <button onClick={onApply} className="h-14 border-4 border-black bg-text-950 px-4 font-black uppercase text-text-50 shadow-[5px_5px_0px_black] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_black]">
        Apply
      </button>
    </div>
  );
}
