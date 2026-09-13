"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function useProfile() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/backend/crm/auth/me`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setUserName(res.data.data.name || "");
          setEmail(res.data.data.email || "");
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) {
      toast.error("Name is required");
      return;
    }
    setSavingProfile(true);
    try {
      await axios.put(
        `/api/backend/crm/auth/profile`,
        { name: userName.trim() },
        { withCredentials: true },
      );
      toast.success("Profile updated successfully");
    } catch (error: unknown) {
      const err = error as {
        response?: { data?: { message?: string }; status?: number };
      };
      toast.error(err?.response?.data?.message || "Failed to update profile");
      if (err?.response?.status === 401) router.push("/login");
    } finally {
      setSavingProfile(false);
    }
  };

  return {
    userName,
    setUserName,
    email,
    loading,
    savingProfile,
    updateProfile,
  };
}
