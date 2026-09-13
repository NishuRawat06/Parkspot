"use client";

import { Check, IndianRupee, ParkingSquare, Pencil, X } from "lucide-react";
import type { RefObject } from "react";
import type { EditableField } from "@/hooks/useLocationEdit";

interface LocationStatsProps {
  visibleSlots: number;
  visiblePrice: number;
  slotsValue: number;
  priceValue: number;
  editing: EditableField;
  inputRef: RefObject<HTMLInputElement | null>;
  onSlotsChange: (value: number) => void;
  onPriceChange: (value: number) => void;
  onEdit: (field: "slots" | "basePrice") => void;
  onCancel: () => void;
  onSave: (e: React.MouseEvent) => void;
}

interface StatTileProps {
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: (e: React.MouseEvent) => void;
}

function TileActions({ isEditing, onEdit, onCancel, onSave }: StatTileProps) {
  if (isEditing) {
    return (
      <div className="flex gap-2">
        <Check
          size={18}
          className="cursor-pointer text-success"
          onClick={onSave}
        />
        <X size={18} className="cursor-pointer text-error" onClick={onCancel} />
      </div>
    );
  }
  return <Pencil size={18} className="cursor-pointer" onClick={onEdit} />;
}

export default function LocationStats({
  visibleSlots,
  visiblePrice,
  slotsValue,
  priceValue,
  editing,
  inputRef,
  onSlotsChange,
  onPriceChange,
  onEdit,
  onCancel,
  onSave,
}: LocationStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {}
      <div className="relative border-4 border-black bg-text-50 p-3.5">
        <div className="flex items-center gap-2 text-text-600">
          <ParkingSquare size={18} strokeWidth={3} />
          <span className="text-[11px] font-black uppercase">Slots</span>
        </div>
        {editing === "slots" ? (
          <input
            ref={inputRef}
            type="number"
            placeholder="Edit Slots"
            className="mt-2 h-9 w-full border-2 border-black px-2 text-xl font-black"
            value={slotsValue}
            onChange={(e) => onSlotsChange(Number(e.target.value))}
          />
        ) : (
          <p className="mt-2 text-2xl font-black leading-none text-text-950">
            {visibleSlots}
          </p>
        )}
        <div className="absolute right-2.5 top-2.5">
          <TileActions
            isEditing={editing === "slots"}
            onEdit={() => onEdit("slots")}
            onCancel={onCancel}
            onSave={onSave}
          />
        </div>
      </div>

      {}
      <div className="relative border-4 border-black bg-text-50 p-3.5">
        <div className="flex items-center gap-2 text-text-600">
          <IndianRupee size={18} strokeWidth={3} />
          <span className="text-[11px] font-black uppercase">Base Price</span>
        </div>
        {editing === "basePrice" ? (
          <input
            ref={inputRef}
            type="number"
            placeholder="Edit Base Price"
            className="mt-2 h-9 w-full border-2 border-black px-2 text-xl font-black"
            value={priceValue}
            onChange={(e) => onPriceChange(Number(e.target.value))}
          />
        ) : (
          <p className="mt-2 text-2xl font-black leading-none text-text-950">
            ₹{visiblePrice}
          </p>
        )}
        <div className="absolute right-2.5 top-2.5">
          <TileActions
            isEditing={editing === "basePrice"}
            onEdit={() => onEdit("basePrice")}
            onCancel={onCancel}
            onSave={onSave}
          />
        </div>
      </div>
    </div>
  );
}
