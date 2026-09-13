"use client";

import Login from "@/components/Login";
import ParkingBackground from "@/components/auth/ParkingBackground";
import { useParkingCars } from "@/hooks/useParkingCars";

/** Login page: decorative parking lot + login card on the right. */
export default function Home() {
  const cars = useParkingCars();

  return (
    <div className="h-screen w-screen flex justify-end relative">
      <ParkingBackground cars={cars} />
      <div className="w-[35%] min-h-screen flex items-end justify-center z-10">
        <Login />
      </div>
    </div>
  );
}
