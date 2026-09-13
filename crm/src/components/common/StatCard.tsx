import React from "react";

interface StatCardProps {
  label: string;
  value: React.ReactNode;
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="flex h-[58px] items-center justify-between border-4 border-black bg-secondary px-4 shadow-[4px_4px_0px_black]">
      <p className="text-sm font-black uppercase tracking-wider text-text-950">
        {label}
      </p>
      <p className="text-2xl font-black text-text-950">{value}</p>
    </div>
  );
}
