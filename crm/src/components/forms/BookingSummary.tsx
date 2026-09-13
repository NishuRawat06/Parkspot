"use client";

import type { BookingFormState } from "@/hooks/useBookingForm";

export function BookingSummary({ form }: { form: BookingFormState }) {
  const items = [
    { label: "Customer", value: form.userName || "—", uppercase: false },
    { label: "Vehicle", value: form.vehicleNumber || "—", uppercase: true },
    { label: "Type", value: form.vehicleType, uppercase: true },
  ];

  return (
    <div className="border-4 border-black bg-text-50 p-5">
      <p className="mb-4 text-xs font-black uppercase tracking-widest text-text-600">
        Booking Summary
      </p>
      <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
        {items.map((item) => (
          <div key={item.label}>
            <p className="text-xs font-black uppercase text-text-500">
              {item.label}
            </p>
            <p
              className={`mt-1 truncate font-black text-text-950 ${item.uppercase ? "uppercase" : ""}`}
            >
              {item.value}
            </p>
          </div>
        ))}
        <div>
          <p className="text-xs font-black uppercase text-text-500">Price</p>
          <p className="mt-1 text-xl font-black text-primary">
            ₹ {form.basePrice || "0"}
          </p>
        </div>
      </div>
    </div>
  );
}
