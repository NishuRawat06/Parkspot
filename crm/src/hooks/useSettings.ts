"use client";

import { useProfile } from "@/hooks/useProfile";
import { usePasswordChange } from "@/hooks/usePasswordChange";
import { useTheme } from "@/hooks/useTheme";
import { useSession } from "@/hooks/useSession";

export function useSettings() {
  const { theme, toggleTheme } = useTheme();
  const profile = useProfile();
  const password = usePasswordChange();
  const { logout } = useSession();

  return {
    theme,
    toggleTheme,
    userName: profile.userName,
    setUserName: profile.setUserName,
    email: profile.email,
    loading: profile.loading,
    savingProfile: profile.savingProfile,
    updateProfile: profile.updateProfile,
    ...password,
    logout,
  };
}

export type SettingsState = ReturnType<typeof useSettings>;
