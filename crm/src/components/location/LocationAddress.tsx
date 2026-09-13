"use client";

import { Check, MapPin, Pencil, X } from "lucide-react";
import type { RefObject } from "react";
import type { EditableField } from "@/hooks/useLocationEdit";

interface LocationAddressProps {
  visibleAddress: string;
  addressValue: string;
  editing: EditableField;
  inputRef: RefObject<HTMLInputElement | null>;
  onChange: (value: string) => void;
  onEdit: () => void;
  onCancel: () => void;
  onSave: (e: React.MouseEvent) => void;
}

export default function LocationAddress({
  visibleAddress,
  addressValue,
  editing,
  inputRef,
  onChange,
  onEdit,
  onCancel,
  onSave,
}: LocationAddressProps) {
  const isEditing = editing === "address";

  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <div className="flex min-w-0 flex-1 gap-2.5">
        <MapPin
          size={20}
          strokeWidth={3}
          className="mt-0.5 shrink-0 text-text-600"
        />
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-black uppercase text-text-500">
            Address
          </p>
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              placeholder="Edit location"
              className="mt-1 h-8 w-full border-2 border-black px-2 text-sm font-bold outline-none"
              value={addressValue}
              onChange={(e) => onChange(e.target.value)}
            />
          ) : (
            <p className="mt-1 truncate text-sm font-bold text-text-950">
              {visibleAddress}
            </p>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="flex shrink-0 gap-2">
          <Check
            size={19}
            className="cursor-pointer text-success"
            onClick={onSave}
          />
          <X
            size={19}
            className="cursor-pointer text-error"
            onClick={onCancel}
          />
        </div>
      ) : (
        <Pencil
          size={19}
          className="shrink-0 cursor-pointer"
          onClick={onEdit}
        />
      )}
    </div>
  );
}
