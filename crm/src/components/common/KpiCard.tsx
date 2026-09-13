import type { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  label: string;
  value: string;
  bg: string;
  text: string;
}

export function KpiCard({ icon, label, value, bg, text }: Props) {
  return (
    <div className={`flex items-center justify-between border-4 border-black px-5 py-4 shadow-[4px_4px_0px_black] ${bg}`}>
      <span className={`flex items-center gap-2 text-sm font-black uppercase ${text}`}>
        {icon}
        {label}
      </span>
      <span className={`text-3xl font-black ${text}`}>{value}</span>
    </div>
  );
}
