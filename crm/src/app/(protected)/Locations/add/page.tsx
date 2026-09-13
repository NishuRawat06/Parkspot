"use client";

import { LocationForm } from "@/components/forms/LocationForm";
import { useLocationForm } from "@/hooks/useLocationForm";

const Page = () => {
  const form = useLocationForm();

  return (
    <main className="min-h-screen w-full bg-background flex items-center justify-center p-5 md:p-10">
      <LocationForm form={form} />
    </main>
  );
};

export default Page;
