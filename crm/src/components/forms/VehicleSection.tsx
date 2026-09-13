"use client";

import { Bike, Car } from "lucide-react";
import { FormField } from "@/components/common/FormField";
import { SectionCard } from "@/components/common/SectionCard";
import type { BookingFormState } from "@/hooks/useBookingForm";

export function VehicleSection({ form }: { form: BookingFormState }) {
  return (
    <SectionCard
      icon={<Car size={20} strokeWidth={3} />}
      title="Vehicle Information"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField
          id="vehicleType"
          label="Vehicle Type"
          icon={<Bike size={18} strokeWidth={3} />}
        >
          <select
            id="vehicleType"
            value={form.vehicleType}
            onChange={(e) => form.setVehicleType(e.target.value)}
            className="h-16 w-full border-4 border-black bg-text-50 px-5 font-black uppercase text-text-950 outline-none transition-all focus:bg-secondary focus:shadow-[5px_5px_0px_var(--color-accent)]"
          >
            <option value="two wheeler">Two Wheeler</option>
            <option value="four wheeler">Four Wheeler</option>
            <option value="heavy vehicle">Heavy Vehicle</option>
          </select>
        </FormField>
      </div>
    </SectionCard>
  );
}
