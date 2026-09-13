"use client";

import { useEffect, useState } from "react";
import type { CrmUser, UserFormData } from "@/types/user";
import { emptyUserForm, filterUsers } from "@/types/user";
import { deleteUser, fetchRoles, fetchUsers, saveUser } from "@/lib/user-api";
import type { CrmRoleOption } from "@/types/user";

export function useUsers() {
  const [users, setUsers] = useState<CrmUser[]>([]);
  const [roles, setRoles] = useState<CrmRoleOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<CrmUser | null>(null);
  const [formData, setFormData] = useState<UserFormData>(emptyUserForm);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const fetchData = async () => {
    try {
      const [u, r] = await Promise.all([fetchUsers(), fetchRoles()]);
      setUsers(u);
      setRoles(r);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (user?: CrmUser) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        email: user.email,
        password: "",
        name: user.name || "",
        roleId: user.roleId?.toString() || "",
      });
    } else {
      setEditingUser(null);
      setFormData(emptyUserForm);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingUser(null);
    setFormData(emptyUserForm);
  };

  const updateField = (patch: Partial<UserFormData>) => {
    setFormData((prev) => ({ ...prev, ...patch }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await saveUser(formData, editingUser?.id);
      closeModal();
      fetchData();
    } catch (err) {
      console.error("Save error:", err);
      alert("Failed to save user");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id);
      fetchData();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Cannot delete user");
    }
  };

  return {
    loading,
    roles,
    search,
    setSearch,
    roleFilter,
    setRoleFilter,
    filteredUsers: filterUsers(users, search, roleFilter),
    showModal,
    editingUser,
    formData,
    saving,
    openModal,
    closeModal,
    updateField,
    submit,
    remove,
  };
}

export type UsersState = ReturnType<typeof useUsers>;
