"use client";

import { Trash2 } from "lucide-react";

interface LocationFooterProps {
  createdAt: string;
  canDelete?: boolean;
  onDelete: () => void;
}

export default function LocationFooter({
  createdAt,
  canDelete = false,
  onDelete,
}: LocationFooterProps) {
  return (
    <div className="flex items-center justify-between border-t-4 border-black bg-text-50 px-4 py-2">
      <p className="text-[11px] font-black uppercase text-text-500">
        Added{" "}
        <span suppressHydrationWarning>
          {new Date(createdAt).toLocaleDateString("en-IN")}
        </span>
      </p>
      {canDelete && (
        <button
          onClick={onDelete}
          className="flex h-8 w-8 items-center justify-center border-2 border-black bg-error text-error-text shadow-[2px_2px_0px_black] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_black]"
        >
          <Trash2 size={14} strokeWidth={3} />
        </button>
      )}
    </div>
  );
}
