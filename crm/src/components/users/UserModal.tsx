"use client";

import { Check, X } from "lucide-react";
import type { CrmRoleOption, CrmUser, UserFormData } from "@/types/user";

interface UserModalProps {
  editingUser: CrmUser | null;
  roles: CrmRoleOption[];
  formData: UserFormData;
  saving: boolean;
  onChange: (patch: Partial<UserFormData>) => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function UserModal({
  editingUser,
  roles,
  formData,
  saving,
  onChange,
  onClose,
  onSubmit,
}: UserModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md border-4 border-black bg-background shadow-[10px_10px_0px_black]">
        <div className="flex items-center justify-between border-b-4 border-black bg-secondary px-4 py-3">
          <h2 className="text-lg font-black uppercase text-text-950">
            {editingUser ? "Edit User" : "Create User"}
          </h2>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center border-4 border-black bg-background text-text-950 shadow-[3px_3px_0px_black] hover:bg-text-100 transition-all"
          >
            <X size={20} strokeWidth={3} />
          </button>
        </div>
        <form onSubmit={onSubmit} className="p-4 space-y-4">
          <div>
            <label className="block mb-2 font-black uppercase text-text-950">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => onChange({ email: e.target.value })}
              required
              disabled={!!editingUser}
              className="w-full h-12 border-4 border-black bg-background px-4 font-bold text-text-950 placeholder:text-text-400 outline-none focus:border-primary disabled:bg-text-100"
            />
          </div>
          <div>
            <label className="block mb-2 font-black uppercase text-text-950">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => onChange({ name: e.target.value })}
              className="w-full h-12 border-4 border-black bg-background px-4 font-bold text-text-950 placeholder:text-text-400 outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block mb-2 font-black uppercase text-text-950">
              {editingUser
                ? "New Password (leave blank to keep current)"
                : "Password"}
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => onChange({ password: e.target.value })}
              required={!editingUser}
              minLength={6}
              className="w-full h-12 border-4 border-black bg-background px-4 font-bold text-text-950 placeholder:text-text-400 outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block mb-2 font-black uppercase text-text-950">
              Role
            </label>
            <select
              value={formData.roleId}
              onChange={(e) => onChange({ roleId: e.target.value })}
              className="w-full h-12 border-4 border-black bg-background px-4 font-bold text-text-950 outline-none focus:border-primary"
            >
              <option value="">Select a role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id.toString()}>
                  {role.name}
                </option>
              ))}
            </select>
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
                  {editingUser ? "Update" : "Create"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
