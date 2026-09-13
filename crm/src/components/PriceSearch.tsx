"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import useDebouncing from "@/hooks/useDebouncing";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Location {
  id: number;
  address: string;
  slots: number;
  basePrice: number;
  createdAt: string;
}

interface PriceSearchProps {
  basePrice: string;
  setBasePrice: (value: string) => void;
}

export function PriceSearch({ basePrice, setBasePrice }: PriceSearchProps) {
  const [locations, setLocations] = useState<Location[]>([]);
  const [searchValue, setSearchValue] = useState("");

  const debouncedSearchTerm = useDebouncing(searchValue, 500);

  useEffect(() => {
    const getLocations = async () => {
      try {
        const params = new URLSearchParams();

        if (debouncedSearchTerm) {
          params.append("address", debouncedSearchTerm);
        }

        const res = await axios.get(
          `/api/backend/crm/location/getall?${params.toString()}`,
        );

        setLocations(res.data.data.rows);
      } catch (err) {
          console.error("Error fetching locations:", err);
          toast.error("Failed to fetch locations");
      }
    };

    getLocations();
  }, [debouncedSearchTerm]);

  return (
    <div>
      <label
        htmlFor="basePrice"
        className="mb-2 block text-sm font-bold text-text-950"
      >
        Base Price
      </label>

      <Combobox
        items={locations}
        value={searchValue}
        onValueChange={(value) => {
          const selectedLocation = locations.find(
            (location) => location.address === value,
          );

          if (selectedLocation) {
            setBasePrice(String(selectedLocation.basePrice));
            setSearchValue("");
          }
        }}
      >
        <ComboboxInput
          id="basePrice"
          placeholder="Search location..."
          value={searchValue || (basePrice ? `₹${basePrice}` : "")}
          onChange={(e) => {
              setSearchValue(e.target.value);
              if (basePrice) {
                setBasePrice("");
              }
            }}
          className="w-full min-w-0 bg-transparent px-5 py-5 text-3xl font-black text-text-950 placeholder:text-text-400 outline-none"
        />

        <ComboboxContent>
          <ComboboxEmpty>No location found.</ComboboxEmpty>

          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item.id} value={item.address}>
                {item.address}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}
