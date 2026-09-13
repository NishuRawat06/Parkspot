export interface CrmUser {
  id: number;
  email: string;
  name: string | null;
  roleId: number | null;
  role: { id: number; name: string } | null;
  createdAt: string;
}

export interface CrmRoleOption {
  id: number;
  name: string;
}

export interface UserFormData {
  email: string;
  password: string;
  name: string;
  roleId: string;
}

export const emptyUserForm: UserFormData = {
  email: "",
  password: "",
  name: "",
  roleId: "",
};

export function toUserPayload(form: UserFormData) {
  return {
    email: form.email,
    name: form.name,
    roleId: form.roleId ? parseInt(form.roleId) : null,
    ...(form.password && { password: form.password }),
  };
}

export function filterUsers(
  users: CrmUser[],
  search: string,
  roleFilter = "all",
): CrmUser[] {
  const q = search.toLowerCase();
  return users.filter((u) => {
    const matchesSearch =
      u.email.toLowerCase().includes(q) ||
      u.name?.toLowerCase().includes(q) ||
      u.role?.name.toLowerCase().includes(q);
    const matchesRole =
      roleFilter === "all" ||
      u.role?.name.toLowerCase() === roleFilter.toLowerCase();
    return matchesSearch && matchesRole;
  });
}
