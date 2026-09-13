"use client";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  AlertTriangle,
  Bike,
  CalendarClock,
  Car,
  IndianRupee,
  Mail,
  ParkingSquare,
  Pencil,
  Phone,
} from "lucide-react";
import type { Booking, EditableBookingField } from "@/types/booking";
import { formatDateTime } from "@/lib/format-date";
import { EditableField } from "./EditableField";
interface BookingCardProps {
  booking: Booking;
  index: number;
  onUpdate: () => void;
}

const STATUS_STYLES: Record<string, string> = {
  parked: "bg-primary text-primary-foreground border-2 border-black",
  exited: "bg-secondary text-text-950 border-2 border-black",
  abandoned: "bg-warning text-warning-text border-2 border-warning",
};
const VEHICLE_OPTIONS = [
  { value: "two wheeler", label: "Two Wheeler" },
  { value: "four wheeler", label: "Four Wheeler" },
  { value: "heavy vehicle", label: "Heavy Vehicle" },
];

const toLocalInput = (d: string | null) =>
  d ? new Date(d).toISOString().slice(0, 16) : "";
export function BookingCard({ booking, index, onUpdate }: BookingCardProps) {
  const [editing, setEditing] = useState<EditableBookingField>(null);
  const [userName, setUserName] = useState(booking.user_name);
  const [email, setEmail] = useState(booking.email);
  const [phoneNumber, setPhoneNumber] = useState(booking.phone_number);
  const [vehicleNumber, setVehicleNumber] = useState(booking.vehicle_number);
  const [vehicleType, setVehicleType] = useState(booking.vehicle_type);
  const [basePrice, setBasePrice] = useState(String(booking.base_price));
  const [entryValue, setEntryValue] = useState(toLocalInput(booking.entry));
  const [expectedExit, setExpectedExit] = useState(
    toLocalInput(booking.expected_exit),
  );
  const cancel = () => setEditing(null);
  const is = (field: EditableBookingField) => editing === field;

  const handleSave = async () => {
    const entryTime = new Date(entryValue);
    const exitTime = new Date(expectedExit);
    if (
      !Number.isNaN(entryTime.getTime()) &&
      !Number.isNaN(exitTime.getTime()) &&
      exitTime <= entryTime
    ) {
      toast.error("Expected exit must be after entry time");
      return;
    }
    try {
      await axios.put(`/api/backend/crm/booking/edit/${booking.id}`, {
        user_name: userName.trim(),
        email: email.trim(),
        phone_number: phoneNumber.trim().toUpperCase(),
        vehicle_number: vehicleNumber.trim().toUpperCase(),
        vehicle_type: vehicleType,
        base_price: Number(basePrice),
        entry: entryValue ? new Date(entryValue).toISOString() : null,
        expected_exit: expectedExit
          ? new Date(expectedExit).toISOString()
          : null,
      });
      toast.success("Booking updated");
      cancel();
      onUpdate();
    } catch (err) {
      console.error("Edit error", err);
      toast.error("Failed to update booking");
    }
  };

  const handleExit = async () => {
    try {
      await axios.put(`/api/backend/crm/booking/exit/${booking.id}`, {});
      toast.success("Booking marked as exited");
      onUpdate();
    } catch (err) {
      const msg = (err as { response?: { data?: { message?: string } } })
        ?.response?.data?.message;
      toast.error(msg || "Failed to exit");
    }
  };

  const bind = (field: Exclude<EditableBookingField, null>) => ({
    isEditing: is(field),
    onEdit: () => setEditing(field),
    onSave: handleSave,
    onCancel: cancel,
  });
  const exited = booking.status?.toLowerCase() === "exited";
  const VehicleIcon = booking.vehicle_type?.toLowerCase().includes("two")
    ? Bike
    : Car;
  const nameKeys = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") cancel();
  };
  return (
    <div className="min-w-0 border-4 border-black bg-background shadow-[5px_5px_0px_black]">
      <div className="flex min-w-0 items-center justify-between gap-3 border-b-4 border-black bg-secondary px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-black bg-primary text-primary-foreground">
            <ParkingSquare size={24} strokeWidth={3} />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-black uppercase text-text-600">
              Booking #{index}
            </p>
            {is("user_name") ? (
              <input
                autoFocus
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onKeyDown={nameKeys}
                className="h-7 w-full border-2 border-black bg-background px-2 text-lg font-black uppercase text-text-950 outline-none"
              />
            ) : (
              <div className="flex items-center gap-2">
                <h2 className="truncate text-lg font-black uppercase text-text-950">
                  {booking.user_name}
                </h2>
                <Pencil
                  size={14}
                  strokeWidth={3}
                  className="shrink-0 cursor-pointer"
                  onClick={() => setEditing("user_name")}
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {booking.status?.toLowerCase() === "abandoned" && (
            <div className="flex items-center gap-1.5 border-2 border-black bg-warning px-2.5 py-1.5 shadow-[2px_2px_0px_black]">
              <AlertTriangle
                size={14}
                strokeWidth={3}
                className="text-warning-text"
              />
              <span className="text-[10px] font-black uppercase text-warning-text">
                Overdue
              </span>
            </div>
          )}
          <div
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-black uppercase ${STATUS_STYLES[booking.status?.toLowerCase()] ?? "bg-text-300 text-text-950 border-2 border-black"}`}
          >
            {booking.status}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 border-b-4 border-black p-4 sm:grid-cols-2">
        <EditableField
          label="Email"
          icon={<Mail size={14} strokeWidth={3} />}
          displayValue={booking.email}
          draft={email}
          onDraftChange={setEmail}
          {...bind("email")}
        />
        <EditableField
          label="Phone"
          icon={<Phone size={14} strokeWidth={3} />}
          displayValue={booking.phone_number}
          draft={phoneNumber}
          onDraftChange={setPhoneNumber}
          {...bind("phone_number")}
        />
      </div>
      <div className="grid grid-cols-2 gap-3 border-b-4 border-black p-4">
        <div className="min-w-0 border-4 border-black bg-text-50 p-3">
          <EditableField
            large
            label="Vehicle"
            icon={<VehicleIcon size={17} strokeWidth={3} />}
            displayValue={booking.vehicle_number}
            draft={vehicleNumber}
            onDraftChange={setVehicleNumber}
            uppercase
            {...bind("vehicle_number")}
          />
        </div>
        <div className="min-w-0 border-4 border-black bg-text-50 p-3">
          <EditableField
            large
            label="Type"
            icon={<Car size={17} strokeWidth={3} />}
            displayValue={booking.vehicle_type}
            draft={vehicleType}
            onDraftChange={setVehicleType}
            options={VEHICLE_OPTIONS}
            {...bind("vehicle_type")}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 border-b-4 border-black p-4 sm:grid-cols-3">
        <EditableField
          label="Entry"
          icon={<CalendarClock size={14} strokeWidth={3} />}
          displayValue={formatDateTime(booking.entry)}
          draft={entryValue}
          onDraftChange={setEntryValue}
          inputType="datetime-local"
          {...bind("entry")}
        />
        <EditableField
          label="Expected Exit"
          icon={<CalendarClock size={14} strokeWidth={3} />}
          displayValue={formatDateTime(booking.expected_exit)}
          draft={expectedExit}
          onDraftChange={setExpectedExit}
          inputType="datetime-local"
          {...bind("expected_exit")}
        />
        <EditableField
          label="Base Price"
          icon={<IndianRupee size={14} strokeWidth={3} />}
          displayValue={`₹${booking.base_price}`}
          draft={basePrice}
          onDraftChange={setBasePrice}
          inputType="number"
          {...bind("base_price")}
        />
      </div>
      <div className="flex items-center justify-between gap-3 bg-text-50 px-4 py-3">
        <span className="text-xs font-black uppercase text-text-600">
          Parking Booking
        </span>
        <label
          className={`flex shrink-0 select-none items-center gap-2 ${exited ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          <span className="text-xs font-black uppercase text-text-950">
            {exited ? "Exited" : "Parked"}
          </span>
          <div className="relative">
            <input
              type="checkbox"
              checked={exited}
              disabled={exited}
              onChange={handleExit}
              className="peer sr-only"
            />
            <div className="h-6 w-11 border-2 border-black bg-text-200 transition-colors peer-checked:bg-success peer-disabled:cursor-not-allowed peer-disabled:opacity-70" />
            <div className="absolute left-0.5 top-0.5 h-5 w-5 border-2 border-black bg-background transition-transform peer-checked:translate-x-5" />
          </div>
        </label>
      </div>
    </div>
  );
}
