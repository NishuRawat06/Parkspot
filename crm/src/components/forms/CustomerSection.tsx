"use client";

import { Car, Mail, Phone, User } from "lucide-react";
import { FormField, brutalInputClass } from "@/components/common/FormField";
import { SectionCard } from "@/components/common/SectionCard";
import type { BookingFormState } from "@/hooks/useBookingForm";

export function CustomerSection({ form }: { form: BookingFormState }) {
  return (
    <SectionCard
      icon={<User size={20} strokeWidth={3} />}
      title="Customer Information"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField
          id="userName"
          label="User Name"
          icon={<User size={18} strokeWidth={3} />}
        >
          <input
            id="userName"
            type="text"
            value={form.userName}
            onChange={(e) => form.setUserName(e.target.value)}
            placeholder="ENTER USER NAME..."
            required
            className={brutalInputClass}
          />
        </FormField>

        <FormField
          id="email"
          label="Email"
          icon={<Mail size={18} strokeWidth={3} />}
        >
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => form.setEmail(e.target.value)}
            placeholder="ENTER EMAIL..."
            required
            className={brutalInputClass}
          />
        </FormField>

        <FormField
          id="phone"
          label="Phone Number"
          icon={<Phone size={18} strokeWidth={3} />}
        >
          <input
            id="phone"
            type="tel"
            maxLength={10}
            value={form.phoneNumber}
            onChange={(e) =>
              form.setPhoneNumber(
                e.target.value.replace(/\D/g, "").slice(0, 10),
              )
            }
            placeholder="9876543210"
            required
            className="h-16 w-full border-4 border-black bg-text-50 px-5 text-xl font-black tracking-wider text-text-950 placeholder:text-text-400 outline-none transition-all focus:bg-secondary focus:shadow-[5px_5px_0px_var(--color-accent)]"
          />
        </FormField>

        <FormField
          id="vehicleNumber"
          label="Vehicle Number"
          icon={<Car size={18} strokeWidth={3} />}
        >
          <input
            id="vehicleNumber"
            type="text"
            value={form.vehicleNumber}
            onChange={(e) =>
              form.setVehicleNumber(e.target.value.toUpperCase())
            }
            placeholder="DL03GH3456"
            required
            className="h-16 w-full border-4 border-black bg-text-50 px-5 font-black uppercase tracking-wider text-text-950 placeholder:text-text-400 outline-none transition-all focus:bg-secondary focus:shadow-[5px_5px_0px_var(--color-accent)]"
          />
        </FormField>
      </div>
    </SectionCard>
  );
}
