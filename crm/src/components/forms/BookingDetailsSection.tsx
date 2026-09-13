"use client";

import { CalendarClock } from "lucide-react";
import { PriceSearch } from "@/components/PriceSearch";
import { FormField } from "@/components/common/FormField";
import { SectionCard } from "@/components/common/SectionCard";
import type { BookingFormState } from "@/hooks/useBookingForm";

export function BookingDetailsSection({ form }: { form: BookingFormState }) {
  return (
    <SectionCard
      icon={<CalendarClock size={20} strokeWidth={3} />}
      title="Booking Information"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField
          id="entry"
          label="Entry Time"
          icon={<CalendarClock size={18} strokeWidth={3} />}
        >
          <input
            id="entry"
            type="datetime-local"
            value={form.entry}
            onChange={(e) => form.setEntry(e.target.value)}
            required
            className="h-16 w-full border-4 border-black bg-text-50 px-5 font-black text-text-950 outline-none transition-all focus:bg-secondary focus:shadow-[5px_5px_0px_var(--color-accent)]"
          />
        </FormField>

        <FormField
          id="expectedExit"
          label="Expected Exit Time"
          icon={<CalendarClock size={18} strokeWidth={3} />}
        >
          <input
            id="expectedExit"
            type="datetime-local"
            value={form.expectedExit}
            min={form.minExit}
            onChange={(e) => form.setExpectedExit(e.target.value)}
            required
            className="h-16 w-full border-4 border-black bg-text-50 px-5 font-black text-text-950 outline-none transition-all focus:bg-secondary focus:shadow-[5px_5px_0px_var(--color-accent)]"
          />
        </FormField>

        <PriceSearch
          basePrice={form.basePrice}
          setBasePrice={form.setBasePrice}
        />
      </div>
    </SectionCard>
  );
}
