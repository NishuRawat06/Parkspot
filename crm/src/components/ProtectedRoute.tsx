"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

interface ProtectedRouteProps {
  children: React.ReactNode;
  permission?: string;
  role?: string[];
  fallback?: React.ReactNode;
}

export const ProtectedRoute = ({ children, permission, role, fallback }: ProtectedRouteProps) => {
  const { hasPermission, hasRole, loading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) return null;

  if (permission && !hasPermission(permission)) {
    return fallback || (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black uppercase text-text-950">Access Denied</h1>
          <p className="mt-4 font-bold text-text-600">
            You don't have permission to access this page.
            Required permission: {permission}
          </p>
        </div>
      </div>
    );
  }

  if (role && !hasRole(...role)) {
    return fallback || (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black uppercase text-text-950">Access Denied</h1>
          <p className="mt-4 font-bold text-text-600">
            You don't have the required role to access this page.
            Required role: {role.join(" or ")}
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export const withPermission = (permission: string) => (Component: React.ComponentType<any>) => {
  return function WithPermissionComponent(props: any) {
    return <ProtectedRoute permission={permission}><Component {...props} /></ProtectedRoute>;
  };
};

export const withRole = (...roles: string[]) => (Component: React.ComponentType<any>) => {
  return function WithRoleComponent(props: any) {
    return <ProtectedRoute role={roles}><Component {...props} /></ProtectedRoute>;
  };
};
