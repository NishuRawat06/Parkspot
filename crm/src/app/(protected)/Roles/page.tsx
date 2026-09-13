"use client";

import { Plus } from "lucide-react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { PageHeader } from "@/components/common/PageHeader";
import { RoleTable } from "@/components/roles/RoleTable";
import { RoleModal } from "@/components/roles/RoleModal";
import { RolePermissionPanel } from "@/components/roles/RolePermissionPanel";
import { useRoles } from "@/hooks/useRoles";
import { useAuth } from "@/lib/auth-context";

const RolesPage = () => {
  const { hasPermission } = useAuth();
  const r = useRoles();

  if (r.loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <ProtectedRoute permission="roles:view">
      <div className="w-full p-6 md:p-10">
        <PageHeader
          eyebrow="Parking Management / Roles"
          title="Roles & Permissions"
          subtitle="Manage user roles and their permissions"
          className="mb-8"
          action={
            hasPermission("roles:create") && (
              <button
                onClick={() => r.openModal()}
                className="flex h-12 items-center gap-2 border-4 border-black bg-primary px-5 font-black uppercase text-primary-foreground shadow-[5px_5px_0px_black] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_black]"
              >
                <Plus size={18} strokeWidth={3} />
                Add Role
              </button>
            )
          }
        />

        <div className="grid items-start gap-6 md:gap-8 lg:grid-cols-2">
          <RoleTable
            roles={r.roles}
            canEdit={hasPermission("roles:edit")}
            canDelete={hasPermission("roles:delete")}
            onEdit={r.openModal}
            onDelete={r.remove}
          />
          <RolePermissionPanel permissions={r.allPermissions} />
        </div>

        {r.showModal && (
          <RoleModal
            editingRole={r.editingRole}
            allPermissions={r.allPermissions}
            formData={r.formData}
            saving={r.saving}
            onNameChange={(name) =>
              r.setFormData((prev) => ({ ...prev, name }))
            }
            onTogglePermission={r.togglePermission}
            onClose={r.closeModal}
            onSubmit={r.submit}
          />
        )}
      </div>
    </ProtectedRoute>
  );
};

export default RolesPage;
