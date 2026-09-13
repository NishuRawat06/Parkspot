"use client";

import { MapPin } from "lucide-react";
import { useLocationEdit } from "@/hooks/useLocationEdit";
import LocationAddress from "./LocationAddress";
import LocationStats from "./LocationStats";
import LocationFooter from "./LocationFooter";

export interface Location {
  id: number;
  address: string;
  slots: number;
  basePrice: number;
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

export interface LocationCardProps extends Location {
  onDelete?: () => void;
  canDelete?: boolean;
}

function LocationCardHeader({ id }: { id: number }) {
  return (
    <div className="flex items-center justify-between border-b-4 border-black bg-secondary px-4 py-3">
      <div className="flex items-center gap-2.5">
        <div className="border-2 border-text-950 bg-primary p-1.5">
          <MapPin size={20} strokeWidth={3} />
        </div>
        <div>
          <p className="text-[11px] font-black uppercase text-text-600">
            Location #{id}
          </p>
          <h2 className="text-lg font-black uppercase leading-tight text-text-950">
            Parking Location
          </h2>
        </div>
      </div>
    </div>
  );
}

const LocationCard = ({
  id,
  address,
  slots,
  basePrice,
  createdAt,
  onDelete,
  canDelete = false,
}: LocationCardProps) => {
  const edit = useLocationEdit({ id, address, slots, basePrice, onDelete });

  return (
    <div className="group border-4 border-black bg-background shadow-[4px_4px_0px_black] transition-transform hover:-translate-y-0.5">
      <LocationCardHeader id={id} />
      <div className="p-4">
        <LocationAddress
          visibleAddress={edit.visibleAddress}
          addressValue={edit.addressValue}
          editing={edit.editing}
          inputRef={edit.inputRef}
          onChange={edit.setAddressValue}
          onEdit={() => edit.setEditing("address")}
          onCancel={edit.cancelEditing}
          onSave={edit.saveEdits}
        />
        <LocationStats
          visibleSlots={edit.visibleSlots}
          visiblePrice={edit.visiblePrice}
          slotsValue={edit.slotsValue}
          priceValue={edit.priceValue}
          editing={edit.editing}
          inputRef={edit.inputRef}
          onSlotsChange={edit.setSlotsValue}
          onPriceChange={edit.setPriceValue}
          onEdit={edit.setEditing}
          onCancel={edit.cancelEditing}
          onSave={edit.saveEdits}
        />
      </div>
      <LocationFooter
        createdAt={createdAt}
        canDelete={canDelete}
        onDelete={edit.deleteLocation}
      />
    </div>
  );
};

export default LocationCard;
