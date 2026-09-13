"use client";

import { GiCarWheel } from "react-icons/gi";
import { Car } from "@/components/icons";
import type { ParkingCar } from "@/hooks/useParkingCars";

function ParkingSymbol() {
  return (
    <div className="rotate-[30deg]">
      <div className="w-[90px] h-[90px] border-[5px] border-text-950 rounded-[20px] flex items-center justify-center">
        <span className="text-[65px] font-bold text-text-950">P</span>
      </div>
    </div>
  );
}

function RoadStrip() {
  return (
    <div className="border-2 h-[180px] w-[1990px] absolute top-full left-[-10%] flex items-center justify-between">
      {Array.from({ length: 10 }, (_, i) => i).map((i) => (
        <div key={i} className="h-[10px] aspect-90/9 bg-text" />
      ))}
    </div>
  );
}

function BrandText() {
  return (
    <div className="h-[10px] text-primary font-extrabold text-7xl flex flex-col absolute bottom-100 right-200">
      <span>Park</span>
      <span className="flex items-center">
        Sp
        <GiCarWheel />t
      </span>
    </div>
  );
}

export default function ParkingBackground({ cars }: { cars: ParkingCar[] }) {
  return (
    <div className="grow h-[100%] w-screen flex items-center absolute top-0 left-0 justify-center overflow-hidden z-[-10]">
      <div className="w-full absolute top-[-25vh] rotate-[-35deg] left-[-25vw]">
        <div className="flex flex-wrap flex-col h-[600px]">
          {cars.map((car) => (
            <div
              key={car.index}
              className="relative h-[300px] w-[180px] flex items-center justify-center border-r-2 border-b-2 border-text-600"
            >
              <div className="rotate-[90deg]">
                {car.isParking ? (
                  <ParkingSymbol />
                ) : (
                  <Car color={car.color} size="18rem" />
                )}
              </div>
            </div>
          ))}
        </div>
        <RoadStrip />
      </div>
      <BrandText />
    </div>
  );
}
