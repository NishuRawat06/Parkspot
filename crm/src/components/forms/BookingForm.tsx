"use client";

import { ArrowRight, ParkingSquare } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionDivider } from "@/components/common/SectionCard";
import { CustomerSection } from "@/components/forms/CustomerSection";
import { VehicleSection } from "@/components/forms/VehicleSection";
import { BookingDetailsSection } from "@/components/forms/BookingDetailsSection";
import { BookingSummary } from "@/components/forms/BookingSummary";
import type { BookingFormState } from "@/hooks/useBookingForm";

export function BookingForm({ form }: { form: BookingFormState }) {
  return (
    <form
      onSubmit={form.handleSubmit}
      className="w-full max-w-4xl border-4 border-black bg-background shadow-[8px_8px_0px_black]"
    >
      <PageHeader
        variant="card"
        eyebrow="Parking Bookings / New"
        title="Add Booking"
        icon={
          <ParkingSquare size={40} strokeWidth={3} className="text-text-950" />
        }
      />

      <div className="space-y-8 p-5 md:p-8">
        <CustomerSection form={form} />
        <SectionDivider />
        <VehicleSection form={form} />
        <SectionDivider />
        <BookingDetailsSection form={form} />
        <BookingSummary form={form} />

        <div className="pt-1">
          <button
            type="submit"
            disabled={form.submit}
            className="group flex w-full items-center justify-center gap-3 border-4 border-black bg-primary px-6 py-5 text-lg font-black uppercase text-primary-foreground shadow-[6px_6px_0px_black] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0px_black] active:translate-x-2 active:translate-y-2 active:shadow-none disabled:cursor-not-allowed disabled:opacity-60"
          >
            {form.submit ? "Adding Booking..." : "Add Parking Booking"}
            {!form.submit && (
              <ArrowRight
                size={24}
                strokeWidth={3}
                className="transition-transform group-hover:translate-x-1"
              />
            )}
          </button>
        </div>
      </div>

      <div className="border-t-4 border-black px-5 py-4 md:px-8">
        <div className="flex items-center justify-between text-xs font-black uppercase text-text-600">
          <span>Parking Management</span>
          <span>New Booking</span>
        </div>
      </div>
    </form>
  );
}
