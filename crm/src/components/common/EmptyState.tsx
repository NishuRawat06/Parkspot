import { ParkingSquare } from "lucide-react";
import type { ReactNode } from "react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
}

export function EmptyState({
  title = "No Bookings Found",
  description = "Try changing your search or add a new booking.",
  icon,
}: EmptyStateProps) {
  return (
    <div className="mt-5 border-4 border-black bg-text-50 p-12 text-center shadow-[5px_5px_0px_black]">
      {icon ?? (
        <ParkingSquare
          size={50}
          className="mx-auto text-primary"
          strokeWidth={2.5}
        />
      )}
      <h2 className="mt-4 text-2xl font-black uppercase text-text-950">
        {title}
      </h2>
      <p className="mt-1 font-bold text-text-600">{description}</p>
    </div>
  );
}
