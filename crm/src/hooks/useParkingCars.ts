"use client";

import { useEffect, useState } from "react";

export interface ParkingCar {
  index: number;
  isParking: boolean;
  color: string;
}

const COLORS = [
  "#A8DADC",
  "#F4B6C2",
  "#B8C0FF",
  "#CDEAC0",
  "#FFE5B4",
  "#D8BFD8",
  "#FDFD96",
  "#BDE0FE",
  "#E6E6FA",
  "#D3D3D3",
];

const TOTAL_CARS = 22;
const PARKING_CHOICES = 16;

const randomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

export function useParkingCars() {
  const [cars, setCars] = useState<ParkingCar[]>(() =>
    Array.from({ length: TOTAL_CARS }, (_, i) => ({
      index: i,
      isParking: i === 0,
      color: COLORS[i % COLORS.length],
    })),
  );

  useEffect(() => {
    const parkingIndex = Math.floor(Math.random() * PARKING_CHOICES);
    setCars(
      Array.from({ length: TOTAL_CARS }, (_, i) => ({
        index: i,
        isParking: parkingIndex === i,
        color: randomColor(),
      })),
    );
  }, []);

  return cars;
}
