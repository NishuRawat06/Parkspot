"use client";

import { Eye, EyeOff, Lock } from "lucide-react";
import { SettingsCard } from "@/components/settings/SettingsCard";

interface PasswordCardProps {
  currentPassword: string;
  newPassword: string;
  showCurrent: boolean;
  showNew: boolean;
  changing: boolean;
  onCurrentChange: (value: string) => void;
  onNewChange: (value: string) => void;
  onToggleCurrent: () => void;
  onToggleNew: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function PasswordCard({
  currentPassword,
  newPassword,
  showCurrent,
  showNew,
  changing,
  onCurrentChange,
  onNewChange,
  onToggleCurrent,
  onToggleNew,
  onSubmit,
}: PasswordCardProps) {
  return (
    <SettingsCard
      icon={<Lock size={20} strokeWidth={3} />}
      title="Change Password"
    >
      <form onSubmit={onSubmit}>
        <div className="space-y-4">
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-black uppercase text-text-950">
              <Lock size={16} strokeWidth={3} />
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => onCurrentChange(e.target.value)}
                placeholder="Enter current password"
                className="h-14 w-full border-4 border-black bg-text-50 px-5 pr-12 font-bold text-text-950 outline-none placeholder:text-text-500 transition-all focus:bg-secondary focus:shadow-[5px_5px_0px_var(--color-accent)]"
              />
              <button
                type="button"
                onClick={onToggleCurrent}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-600 hover:text-text-950"
              >
                {showCurrent ? (
                  <EyeOff size={20} strokeWidth={3} />
                ) : (
                  <Eye size={20} strokeWidth={3} />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-black uppercase text-text-950">
              <Lock size={16} strokeWidth={3} />
              New Password
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => onNewChange(e.target.value)}
                placeholder="Enter new password"
                className="h-14 w-full border-4 border-black bg-text-50 px-5 pr-12 font-bold text-text-950 outline-none placeholder:text-text-500 transition-all focus:bg-secondary focus:shadow-[5px_5px_0px_var(--color-accent)]"
              />
              <button
                type="button"
                onClick={onToggleNew}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-600 hover:text-text-950"
              >
                {showNew ? (
                  <EyeOff size={20} strokeWidth={3} />
                ) : (
                  <Eye size={20} strokeWidth={3} />
                )}
              </button>
            </div>
            <p className="mt-2 text-xs font-bold text-text-600">
              Minimum 6 characters
            </p>
          </div>

          <button
            type="submit"
            disabled={changing}
            className="flex w-full items-center justify-center gap-2 border-4 border-black bg-primary px-5 py-4 font-black uppercase text-primary-foreground shadow-[5px_5px_0px_black] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_black] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Lock size={18} strokeWidth={3} />
            {changing ? "Changing..." : "Change Password"}
          </button>
        </div>
      </form>
    </SettingsCard>
  );
}
