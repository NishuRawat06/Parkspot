"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export interface RolePermission {
  id: number;
  resource: string;
}

export interface CrmRole {
  id: number;
  name: string;
  permissions: RolePermission[];
  users: { id: number; email: string; name: string | null }[];
}

export interface RoleFormData {
  name: string;
  permissions: string[];
}

const emptyForm: RoleFormData = { name: "", permissions: [] };

export function useRoles() {
  const [roles, setRoles] = useState<CrmRole[]>([]);
  const [allPermissions, setAllPermissions] = useState<RolePermission[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingRole, setEditingRole] = useState<CrmRole | null>(null);
  const [formData, setFormData] = useState<RoleFormData>(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    try {
      const [rolesRes, permsRes] = await Promise.all([
        axios.get(`/api/backend/crm/roles`, { withCredentials: true }),
        axios.get(`/api/backend/crm/roles/permissions`, {
          withCredentials: true,
        }),
      ]);
      setRoles(rolesRes.data.data);
      setAllPermissions(permsRes.data.data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (role?: CrmRole) => {
    if (role) {
      setEditingRole(role);
      setFormData({
        name: role.name,
        permissions: role.permissions.map((p) => p.resource),
      });
    } else {
      setEditingRole(null);
      setFormData(emptyForm);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingRole(null);
    setFormData(emptyForm);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingRole) {
        await axios.put(`/api/backend/crm/roles/${editingRole.id}`, formData, {
          withCredentials: true,
        });
      } else {
        await axios.post(`/api/backend/crm/roles`, formData, {
          withCredentials: true,
        });
      }
      closeModal();
      fetchData();
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: number) => {
    if (!confirm("Are you sure you want to delete this role?")) return;
    try {
      await axios.delete(`/api/backend/crm/roles/${id}`, {
        withCredentials: true,
      });
      fetchData();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Cannot delete role - it may be assigned to users");
    }
  };

  const togglePermission = (permission: string) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...prev.permissions, permission],
    }));
  };

  return {
    roles,
    allPermissions,
    loading,
    showModal,
    editingRole,
    formData,
    setFormData,
    saving,
    openModal,
    closeModal,
    submit,
    remove,
    togglePermission,
  };
}

export type RolesState = ReturnType<typeof useRoles>;
