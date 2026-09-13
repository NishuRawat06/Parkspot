"use client";

import {
  Edit,
  Filter,
  Mail,
  Search,
  Shield,
  Trash2,
  Users,
} from "lucide-react";
import type { CrmRoleOption, CrmUser } from "@/types/user";

interface UserTableProps {
  users: CrmUser[];
  search: string;
  onSearchChange: (value: string) => void;
  roleFilter: string;
  onRoleFilterChange: (value: string) => void;
  roleOptions: CrmRoleOption[];
  canEdit: boolean;
  canDelete: boolean;
  onEdit: (user: CrmUser) => void;
  onDelete: (id: number) => void;
}

export function UserTable({
  users,
  search,
  onSearchChange,
  roleFilter,
  onRoleFilterChange,
  roleOptions,
  canEdit,
  canDelete,
  onEdit,
  onDelete,
}: UserTableProps) {
  return (
    <div className="border-4 border-black bg-background shadow-[5px_5px_0px_black]">
      <div className="border-b-4 border-black bg-secondary px-4 py-3">
        <h2 className="text-lg font-black uppercase text-text-950">Users</h2>
      </div>
      <div className="p-4">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row">
          <div className="relative max-w-md flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-12 border-4 border-black bg-background pl-10 pr-4 font-bold text-text-950 placeholder:text-text-400 outline-none focus:border-primary"
            />
          </div>

          <div className="relative sm:w-56">
            <Filter
              size={18}
              strokeWidth={3}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-950"
            />
            <select
              value={roleFilter}
              onChange={(e) => onRoleFilterChange(e.target.value)}
              className="h-12 w-full cursor-pointer appearance-none border-4 border-black bg-secondary pl-10 pr-4 font-black uppercase text-text-950 outline-none"
            >
              <option value="all">All roles</option>
              {roleOptions.map((role) => (
                <option key={role.id} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-4 border-black bg-secondary">
                <th className="text-left px-4 py-3 font-black uppercase text-text-950">
                  Email
                </th>
                <th className="text-left px-4 py-3 font-black uppercase text-text-950">
                  Name
                </th>
                <th className="text-left px-4 py-3 font-black uppercase text-text-950">
                  Role
                </th>
                <th className="text-left px-4 py-3 font-black uppercase text-text-950">
                  Joined
                </th>
                <th className="text-right px-4 py-3 font-black uppercase text-text-950">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-black">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-3 font-bold text-text-950">
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-text-400" />
                      {user.email}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-bold text-text-950">
                    {user.name || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-2 px-3 py-1 border-2 border-black bg-secondary text-sm font-black uppercase text-text-950">
                      <Shield size={12} strokeWidth={3} />
                      {user.role?.name || "No role"}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-bold text-text-600">
                    <span suppressHydrationWarning>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {canEdit && (
                        <button
                          onClick={() => onEdit(user)}
                          className="flex h-10 w-10 items-center justify-center border-4 border-black bg-secondary text-text-950 shadow-[3px_3px_0px_black] hover:bg-text-100 transition-all"
                        >
                          <Edit size={16} strokeWidth={3} />
                        </button>
                      )}
                      {canDelete && user.email !== "admin@parkspot.com" && (
                        <button
                          onClick={() => onDelete(user.id)}
                          className="flex h-10 w-10 items-center justify-center border-4 border-black bg-error text-error-text shadow-[3px_3px_0px_black] hover:bg-error/80 transition-all"
                        >
                          <Trash2 size={16} strokeWidth={3} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {users.length === 0 && (
            <div className="text-center py-12">
              <Users size={48} className="mx-auto text-text-300" />
              <p className="mt-4 font-black uppercase text-text-950">
                No users found
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
