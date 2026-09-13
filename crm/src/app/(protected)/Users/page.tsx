"use client";

import { Plus } from "lucide-react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { PageHeader } from "@/components/common/PageHeader";
import { UserTable } from "@/components/users/UserTable";
import { UserModal } from "@/components/users/UserModal";
import { useUsers } from "@/hooks/useUsers";
import { useAuth } from "@/lib/auth-context";

const UsersPage = () => {
  const { hasPermission } = useAuth();
  const u = useUsers();

  if (u.loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <ProtectedRoute permission="users:view">
      <div className="p-6">
        <PageHeader
          eyebrow="Parking Management / Users"
          title="User Management"
          subtitle="Manage CRM users and their roles"
          className="mb-6"
          action={
            hasPermission("users:create") && (
              <button
                onClick={() => u.openModal()}
                className="flex h-12 items-center gap-2 border-4 border-black bg-primary px-5 font-black uppercase text-primary-foreground shadow-[5px_5px_0px_black] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_black]"
              >
                <Plus size={18} strokeWidth={3} />
                Add User
              </button>
            )
          }
        />

        <UserTable
          users={u.filteredUsers}
          search={u.search}
          onSearchChange={u.setSearch}
          roleFilter={u.roleFilter}
          onRoleFilterChange={u.setRoleFilter}
          roleOptions={u.roles}
          canEdit={hasPermission("users:edit")}
          canDelete={hasPermission("users:delete")}
          onEdit={u.openModal}
          onDelete={u.remove}
        />

        {u.showModal && (
          <UserModal
            editingUser={u.editingUser}
            roles={u.roles}
            formData={u.formData}
            saving={u.saving}
            onChange={u.updateField}
            onClose={u.closeModal}
            onSubmit={u.submit}
          />
        )}
      </div>
    </ProtectedRoute>
  );
};

export default UsersPage;
