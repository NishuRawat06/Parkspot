"use client";

import { Edit, Trash2 } from "lucide-react";
import type { CrmRole } from "@/hooks/useRoles";

interface RoleTableProps {
  roles: CrmRole[];
  canEdit: boolean;
  canDelete: boolean;
  onEdit: (role: CrmRole) => void;
  onDelete: (id: number) => void;
}

export function RoleTable({
  roles,
  canEdit,
  canDelete,
  onEdit,
  onDelete,
}: RoleTableProps) {
  return (
    <div className="border-4 border-black bg-background shadow-[5px_5px_0px_black]">
      <div className="border-b-4 border-black bg-secondary px-5 py-4">
        <h2 className="text-lg font-black uppercase text-text-950">Roles</h2>
        <p className="mt-0.5 text-xs font-bold uppercase tracking-wider text-text-600">
          {roles.length} roles total
        </p>
      </div>
      <div className="space-y-3 p-5 md:p-6">
        {roles.map((role) => (
          <div
            key={role.id}
            className="flex items-center justify-between gap-4 border-2 border-black/10 bg-text-50/60 px-4 py-4"
          >
            <div>
              <p className="font-black uppercase text-text-950">{role.name}</p>
              <p className="mt-1 text-xs font-bold text-text-600">
                {role.permissions.length} permissions · {role.users.length}{" "}
                users
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              {canEdit && (
                <button
                  onClick={() => onEdit(role)}
                  className="flex h-10 w-10 items-center justify-center border-4 border-black bg-secondary text-text-950 shadow-[3px_3px_0px_black] hover:bg-text-100 transition-all"
                >
                  <Edit size={16} strokeWidth={3} />
                </button>
              )}
              {canDelete && role.name !== "admin" && (
                <button
                  onClick={() => onDelete(role.id)}
                  className="flex h-10 w-10 items-center justify-center border-4 border-black bg-error text-error-text shadow-[3px_3px_0px_black] hover:bg-error/80 transition-all"
                >
                  <Trash2 size={16} strokeWidth={3} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
