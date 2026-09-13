"use client";

import { BookingForm } from "@/components/forms/BookingForm";
import { useBookingForm } from "@/hooks/useBookingForm";

const Page = () => {
  const form = useBookingForm();

  return (
    <main className="min-h-screen w-full bg-background flex items-center justify-center p-5 md:p-10">
      <BookingForm form={form} />
    </main>
  );
};

export default Page;
