import { ParkingSquare } from "lucide-react";

export function ChartSkeleton({ height }: { height: number }) {
  return <div className="w-full animate-pulse border-4 border-black bg-text-100" style={{ height }} />;
}

export function EmptyChart() {
  return (
    <div className="flex h-[280px] flex-col items-center justify-center">
      <ParkingSquare size={44} strokeWidth={2.5} className="text-primary" />
      <p className="mt-3 font-black uppercase text-text-950">No data yet</p>
      <p className="text-sm font-bold text-text-600">Add bookings to see charts</p>
    </div>
  );
}

export function SectionTitle({ dot, title }: { dot: string; title: string }) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <div className={`h-3 w-3 ${dot}`} />
      <h2 className="text-lg font-black uppercase text-text-950">{title}</h2>
    </div>
  );
}
