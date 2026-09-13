"use client";

import { LogOut } from "lucide-react";
import { SettingsCard } from "@/components/settings/SettingsCard";

export function SessionCard({ onLogout }: { onLogout: () => void }) {
  return (
    <SettingsCard
      tone="danger"
      icon={<LogOut size={20} strokeWidth={3} className="text-error-text" />}
      title="Session"
    >
      <p className="mb-4 font-bold text-text-600">Sign out of your account</p>
      <button
        onClick={onLogout}
        className="flex w-full items-center justify-center gap-3 border-4 border-black bg-error px-5 py-5 font-black uppercase text-error-text shadow-[5px_5px_0px_black] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_black] hover:bg-error/80"
      >
        <LogOut size={22} strokeWidth={3} />
        Logout
      </button>
    </SettingsCard>
  );
}
