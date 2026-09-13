import axios from "axios";
import type { CrmRoleOption, CrmUser, UserFormData } from "@/types/user";
import { toUserPayload } from "@/types/user";

const opts = { withCredentials: true };

export async function fetchUsers(): Promise<CrmUser[]> {
  const res = await axios.get(`/api/backend/crm/users`, opts);
  return res.data.success && res.data.data ? res.data.data : [];
}

export async function fetchRoles(): Promise<CrmRoleOption[]> {
  const res = await axios.get(`/api/backend/crm/roles`, opts);
  return res.data.data ?? [];
}

export async function saveUser(
  form: UserFormData,
  editingId?: number,
): Promise<void> {
  const payload = toUserPayload(form);
  if (editingId) {
    await axios.put(`/api/backend/crm/users/${editingId}`, payload, opts);
  } else {
    await axios.post(`/api/backend/crm/auth/createUser`, payload, opts);
  }
}

export async function deleteUser(id: number): Promise<void> {
  await axios.delete(`/api/backend/crm/users/${id}`, opts);
}
