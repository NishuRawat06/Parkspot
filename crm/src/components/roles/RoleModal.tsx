"use client";

import { Check, X } from "lucide-react";
import type { CrmRole, RoleFormData, RolePermission } from "@/hooks/useRoles";

interface RoleModalProps {
  editingRole: CrmRole | null;
  allPermissions: RolePermission[];
  formData: RoleFormData;
  saving: boolean;
  onNameChange: (name: string) => void;
  onTogglePermission: (permission: string) => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function RoleModal({
  editingRole,
  allPermissions,
  formData,
  saving,
  onNameChange,
  onTogglePermission,
  onClose,
  onSubmit,
}: RoleModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto border-4 border-black bg-background shadow-[10px_10px_0px_black]">
        <div className="flex items-center justify-between border-b-4 border-black bg-secondary px-5 py-4">
          <h2 className="text-lg font-black uppercase text-text-950">
            {editingRole ? "Edit Role" : "Create Role"}
          </h2>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center border-4 border-black bg-background text-text-950 shadow-[3px_3px_0px_black] hover:bg-text-100 transition-all"
          >
            <X size={20} strokeWidth={3} />
          </button>
        </div>
        <form onSubmit={onSubmit} className="space-y-5 p-5 md:p-6">
          <div>
            <label className="block mb-2 font-black uppercase text-text-950">
              Role Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => onNameChange(e.target.value)}
              required
              className="w-full h-12 border-4 border-black bg-background px-4 font-bold text-text-950 placeholder:text-text-400 outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block mb-2 font-black uppercase text-text-950">
              Permissions
            </label>
            <div className="max-h-64 space-y-2.5 overflow-y-auto border-2 border-black p-3">
              {allPermissions.map((perm) => (
                <label
                  key={perm.id}
                  className="flex cursor-pointer items-center gap-3 px-2 py-2"
                >
                  <input
                    type="checkbox"
                    checked={formData.permissions.includes(perm.resource)}
                    onChange={() => onTogglePermission(perm.resource)}
                    className="h-5 w-5 border-2 border-black rounded"
                  />
                  <span className="font-mono text-sm font-bold text-text-950">
                    {perm.resource}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t-2 border-black">
            <button
              type="button"
              onClick={onClose}
              className="flex h-12 items-center gap-2 border-4 border-black bg-background px-5 font-black uppercase text-text-950 shadow-[5px_5px_0px_black] hover:bg-text-100 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex h-12 items-center gap-2 border-4 border-black bg-primary px-5 font-black uppercase text-primary-foreground shadow-[5px_5px_0px_black] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_black] disabled:opacity-50"
            >
              {saving ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <Check size={16} strokeWidth={3} />
                  {editingRole ? "Update" : "Create"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
