"use client";

import { ArrowRight, IndianRupee, MapPin, ParkingSquare } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { FormField } from "@/components/common/FormField";
import type { LocationFormState } from "@/hooks/useLocationForm";

export function LocationForm({ form }: { form: LocationFormState }) {
  return (
    <form
      onSubmit={form.handleSubmit}
      className="w-full max-w-3xl border-4 border-black bg-background shadow-[8px_8px_0px_black]"
    >
      <PageHeader
        variant="card"
        eyebrow="Parking Locations / New"
        title="Add Location"
        icon={
          <ParkingSquare size={40} strokeWidth={3} className="text-text-950" />
        }
      />

      <div className="space-y-7 p-5 md:p-8">
        <FormField
          id="address"
          label="Address"
          icon={<MapPin size={18} strokeWidth={3} />}
        >
          <textarea
            id="address"
            name="address"
            rows={4}
            required
            value={form.address}
            onChange={(e) => form.setAddress(e.target.value)}
            placeholder="ENTER PARKING LOCATION ADDRESS..."
            className="w-full resize-none border-4 border-black bg-text-50 px-5 py-4 font-bold text-text-950 placeholder:text-text-500 outline-none transition-all focus:bg-secondary focus:shadow-[5px_5px_0px_var(--color-accent)]"
          />
        </FormField>

        <div className="h-1 bg-text-950" />

        <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
          <FormField
            id="slots"
            label="Total Slots"
            icon={<ParkingSquare size={18} strokeWidth={3} />}
          >
            <div className="flex border-4 border-black bg-text-50">
              <input
                id="slots"
                name="slots"
                type="number"
                min="1"
                required
                value={form.slots}
                onChange={(e) => form.setSlots(e.target.value)}
                placeholder="0"
                className="w-full min-w-0 bg-transparent px-5 py-5 text-3xl font-black text-text-950 placeholder:text-text-400 outline-none"
              />
              <div className="flex items-center border-l-4 border-black bg-primary px-4 text-xs font-black uppercase text-text-950">
                Slots
              </div>
            </div>
          </FormField>

          <FormField
            id="basePrice"
            label="Base Price"
            icon={<IndianRupee size={18} strokeWidth={3} />}
          >
            <div className="flex border-4 border-black bg-text-50">
              <div className="flex items-center border-r-4 border-black bg-primary px-5 text-xl font-black text-text-950">
                ₹
              </div>
              <input
                id="basePrice"
                name="basePrice"
                type="number"
                min="0"
                step="0.01"
                required
                value={form.basePrice}
                onChange={(e) => form.setBasePrice(e.target.value)}
                placeholder="0"
                className="w-full min-w-0 bg-transparent px-5 py-5 text-3xl font-black text-text-950 placeholder:text-text-400 outline-none"
              />
            </div>
          </FormField>
        </div>

        <div className="pt-3">
          <button
            type="submit"
            disabled={form.submit}
            className="group flex w-full items-center justify-center gap-3 border-4 border-black bg-primary px-6 py-5 text-lg font-black uppercase text-primary-foreground shadow-[6px_6px_0px_black] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0px_black] active:translate-x-2 active:translate-y-2 active:shadow-none disabled:cursor-not-allowed disabled:opacity-60"
          >
            {form.submit ? "Adding Location..." : "Add Parking Location"}
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
          <span>New Location</span>
        </div>
      </div>
    </form>
  );
}
