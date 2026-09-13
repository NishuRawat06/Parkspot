"use client";

import { Mail, Save, User } from "lucide-react";
import { SettingsCard } from "@/components/settings/SettingsCard";

interface ProfileCardProps {
  userName: string;
  email: string;
  loading: boolean;
  saving: boolean;
  onNameChange: (name: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function ProfileCard({
  userName,
  email,
  loading,
  saving,
  onNameChange,
  onSubmit,
}: ProfileCardProps) {
  return (
    <SettingsCard icon={<User size={20} strokeWidth={3} />} title="Profile">
      <form onSubmit={onSubmit}>
        {loading ? (
          <div className="space-y-4">
            <div className="h-16 w-full animate-pulse border-4 border-black bg-text-100" />
            <div className="h-16 w-full animate-pulse border-4 border-black bg-text-100" />
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-black uppercase text-text-950">
                <User size={16} strokeWidth={3} />
                Name
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => onNameChange(e.target.value)}
                placeholder="Enter your name"
                className="h-14 w-full border-4 border-black bg-text-50 px-5 font-bold text-text-950 outline-none placeholder:text-text-500 transition-all focus:bg-secondary focus:shadow-[5px_5px_0px_var(--color-accent)]"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-black uppercase text-text-950">
                <Mail size={16} strokeWidth={3} />
                Email
              </label>
              <div className="flex h-14 w-full items-center border-4 border-black bg-text-100 px-5">
                <span className="font-bold text-text-600">{email}</span>
              </div>
              <p className="mt-1 text-xs font-bold text-text-500">
                Email cannot be changed
              </p>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="flex w-full items-center justify-center gap-2 border-4 border-black bg-primary px-5 py-4 font-black uppercase text-primary-foreground shadow-[5px_5px_0px_black] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_black] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Save size={18} strokeWidth={3} />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}
      </form>
    </SettingsCard>
  );
}
