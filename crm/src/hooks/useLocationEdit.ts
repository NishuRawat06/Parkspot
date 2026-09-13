"use client";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export type EditableField = "address" | "slots" | "basePrice" | null;

interface UseLocationEditArgs {
  id: number;
  address: string;
  slots: number;
  basePrice: number;
  onDelete?: () => void;
}

/**
 * Inline-edit state for one location card.
 * Holds visible values, draft inputs, focus handling,
 * plus save (PUT) and delete (DELETE) actions.
 */
export function useLocationEdit({
  id,
  address,
  slots,
  basePrice,
  onDelete,
}: UseLocationEditArgs) {
  const [visibleAddress, setVisibleAddress] = useState(address);
  const [visibleSlots, setVisibleSlots] = useState(slots);
  const [visiblePrice, setVisiblePrice] = useState(basePrice);

  const [addressValue, setAddressValue] = useState(address);
  const [slotsValue, setSlotsValue] = useState(slots);
  const [priceValue, setPriceValue] = useState(basePrice);

  const [editing, setEditing] = useState<EditableField>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const cancelEditing = () => setEditing(null);

  const saveEdits = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await axios.put(`/api/backend/crm/location/editLocation/${id}`, {
        address: addressValue,
        slots: Number(slotsValue),
        basePrice: Number(priceValue),
      });
      toast.success("Location updated successfully");
      setEditing(null);
      setVisibleAddress(addressValue);
      setVisibleSlots(slotsValue);
      setVisiblePrice(priceValue);
    } catch (err) {
      console.log("error", err);
      toast.error("Edit location failed");
    }
  };

  const deleteLocation = async () => {
    if (!confirm("Are you sure you want to delete this location?")) return;
    try {
      await axios.delete(`/api/backend/crm/location/deleteLocation/${id}`);
      toast.success("Location deleted successfully");
      onDelete?.();
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete location");
    }
  };

  return {
    visibleAddress,
    visibleSlots,
    visiblePrice,
    addressValue,
    slotsValue,
    priceValue,
    setAddressValue,
    setSlotsValue,
    setPriceValue,
    editing,
    setEditing,
    cancelEditing,
    inputRef,
    saveEdits,
    deleteLocation,
  };
}

export type UseLocationEditReturn = ReturnType<typeof useLocationEdit>;
