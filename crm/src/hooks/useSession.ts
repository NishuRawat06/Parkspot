"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function useSession() {
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.post(
        `/api/backend/crm/auth/logout`,
        {},
        { withCredentials: true },
      );
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      router.push("/login");
    }
  };

  return { logout };
}
