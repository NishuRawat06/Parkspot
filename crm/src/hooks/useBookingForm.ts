"use client";

import { useMemo, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const toDateTimeLocal = (d: Date) => {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

export function useBookingForm() {
  const [submit, setSubmit] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("two wheeler");
  const [entry, setEntry] = useState("");
  const [expectedExit, setExpectedExit] = useState("");
  const [basePrice, setBasePrice] = useState("");

  const minExit = useMemo(() => {
    if (!entry) return "";
    const entryDate = new Date(entry);
    if (Number.isNaN(entryDate.getTime())) return "";
    return toDateTimeLocal(entryDate);
  }, [entry]);

  const reset = () => {
    setUserName("");
    setEmail("");
    setPhoneNumber("");
    setVehicleNumber("");
    setVehicleType("two wheeler");
    setEntry("");
    setExpectedExit("");
    setBasePrice("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userName) {
      toast.error("Please enter user name");
      return;
    }
    if (!email) {
      toast.error("Please enter email");
      return;
    }
    if (!phoneNumber || phoneNumber.length !== 10) {
      toast.error("Please enter a valid phone number");
      return;
    }
    if (!vehicleNumber) {
      toast.error("Please enter vehicle number");
      return;
    }
    if (!vehicleType) {
      toast.error("Please select vehicle type");
      return;
    }
    if (!entry) {
      toast.error("Please select entry time");
      return;
    }
    if (!expectedExit) {
      toast.error("Please select expected exit time");
      return;
    }

    const entryDate = new Date(entry);
    const exitDate = new Date(expectedExit);
    if (exitDate.getTime() <= entryDate.getTime()) {
      toast.error("Expected exit must be after entry time");
      return;
    }
    if (!basePrice || Number(basePrice) < 0) {
      toast.error("Please enter a valid base price");
      return;
    }

    setSubmit(true);
    try {
      const res = await axios.post(`/api/backend/crm/booking/add`, {
        user_name: userName.trim(),
        email: email.trim(),
        phone_number: phoneNumber,
        vehicle_number: vehicleNumber.trim().toUpperCase(),
        vehicle_type: vehicleType,
        entry: entry ? new Date(entry).toISOString() : null,
        expected_exit: expectedExit
          ? new Date(expectedExit).toISOString()
          : null,
        base_price: Number(basePrice),
        status: "parked",
      });
      console.log("booking response", res.data);
      toast.success("Booking added successfully");
      reset();
    } catch (err) {
      console.log("booking error", err);
      toast.error("Adding booking failed");
    } finally {
      setSubmit(false);
    }
  };

  return {
    submit,
    userName,
    setUserName,
    email,
    setEmail,
    phoneNumber,
    setPhoneNumber,
    vehicleNumber,
    setVehicleNumber,
    vehicleType,
    setVehicleType,
    entry,
    setEntry,
    expectedExit,
    setExpectedExit,
    basePrice,
    setBasePrice,
    minExit,
    handleSubmit,
  };
}

export type BookingFormState = ReturnType<typeof useBookingForm>;
