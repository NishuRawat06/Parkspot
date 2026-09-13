"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export function useLocationForm() {
  const [submit, setSubmit] = useState(false);
  const [address, setAddress] = useState("");
  const [slots, setSlots] = useState("");
  const [basePrice, setBasePrice] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!address.trim()) {
      toast.error("Please enter an address");
      return;
    }
    if (!slots || Number(slots) <= 0) {
      toast.error("Please enter a valid number of slots");
      return;
    }
    if (!basePrice || Number(basePrice) < 0) {
      toast.error("Please enter a valid base price");
      return;
    }

    setSubmit(true);
    try {
      const res = await axios.post(`/api/backend/crm/location/addLocation`, {
        address: address.trim(),
        slots: Number(slots),
        basePrice: Number(basePrice),
      });
      console.log("detailssssss", res.data);
      toast.success("Location added successfully");
      setAddress("");
      setSlots("");
      setBasePrice("");
    } catch (err) {
      console.log("erorrr", err);
      toast.error("Adding location failed");
    } finally {
      setSubmit(false);
    }
  };

  return {
    submit,
    address,
    setAddress,
    slots,
    setSlots,
    basePrice,
    setBasePrice,
    handleSubmit,
  };
}

export type LocationFormState = ReturnType<typeof useLocationForm>;
