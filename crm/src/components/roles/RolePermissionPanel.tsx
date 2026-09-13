"use client";

import type { RolePermission } from "@/hooks/useRoles";

export function RolePermissionPanel({
  permissions,
}: {
  permissions: RolePermission[];
}) {
  return (
    <div className="border-4 border-black bg-background shadow-[5px_5px_0px_black]">
      <div className="border-b-4 border-black bg-secondary px-5 py-4">
        <h2 className="text-lg font-black uppercase text-text-950">
          All Permissions
        </h2>
        <p className="mt-0.5 text-xs font-bold uppercase tracking-wider text-text-600">
          {permissions.length} permissions available
        </p>
      </div>
      <div className="max-h-[520px] overflow-y-auto p-5 md:p-6">
        <div className="space-y-3">
          {permissions.map((perm) => (
            <label
              key={perm.id}
              className="flex items-center gap-3 border-2 border-black/10 bg-text-50/60 px-4 py-3"
            >
              <input
                type="checkbox"
                className="h-5 w-5 border-2 border-black rounded"
              />
              <span className="font-mono text-sm font-bold text-text-950">
                {perm.resource}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
