"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function usePasswordChange() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      toast.error("Both passwords are required");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }
    if (currentPassword === newPassword) {
      toast.error("New password must be different");
      return;
    }
    setChangingPassword(true);
    try {
      await axios.put(
        `/api/backend/crm/auth/change-password`,
        { currentPassword, newPassword },
        { withCredentials: true },
      );
      toast.success("Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
    } catch (error: unknown) {
      const err = error as {
        response?: { data?: { message?: string }; status?: number };
      };
      toast.error(err?.response?.data?.message || "Failed to change password");
      if (err?.response?.status === 401) router.push("/login");
    } finally {
      setChangingPassword(false);
    }
  };

  return {
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    showCurrentPassword,
    setShowCurrentPassword,
    showNewPassword,
    setShowNewPassword,
    changingPassword,
    changePassword,
  };
}
