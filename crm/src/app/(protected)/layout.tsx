"use client";

import Sidebar from "@/components/Sidebar";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="flex">
        <Sidebar />
        {children}
      </div>
    </ProtectedRoute>
  );
}
