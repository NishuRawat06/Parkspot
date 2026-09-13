"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import type { AuthContextType, User } from "@/types/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function toUser(data: {
  id: number;
  email: string;
  name: string | null;
  role?:
    | { name?: string; permissions?: { resource: string }[] }
    | string
    | null;
  roleId?: number | null;
}): User {
  return {
    id: data.id,
    email: data.email,
    name: data.name,
    role: typeof data.role === "string" ? data.role : (data.role?.name ?? null),
    roleId: data.roleId ?? null,
    permissions:
      typeof data.role === "object"
        ? (data.role?.permissions?.map((p) => p.resource) ?? [])
        : [],
  };
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const res = await axios.get(`/api/backend/crm/auth/me`, {
        withCredentials: true,
      });
      setUser(res.data.success && res.data.data ? toUser(res.data.data) : null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async (email: string, password: string) => {
    const res = await axios.post(
      `/api/backend/crm/auth/login`,
      { email, password },
      { withCredentials: true },
    );
    if (res.data.userId) {
      setUser({
        id: res.data.userId,
        email: res.data.email,
        name: res.data.name,
        role: res.data.role,
        roleId: null,
        permissions: res.data.permissions || [],
      });
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        `/api/backend/crm/auth/logout`,
        {},
        { withCredentials: true },
      );
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
    }
  };

  const refreshUser = async () => {
    await fetchUser();
  };

  const hasPermission = (permission: string) =>
    user?.permissions?.includes(permission) || false;

  const hasRole = (...roles: string[]) =>
    user?.role ? roles.includes(user.role) : false;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        refreshUser,
        hasPermission,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
