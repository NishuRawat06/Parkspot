"use client";

import { Moon, Sun } from "lucide-react";
import { SettingsCard } from "@/components/settings/SettingsCard";

interface ThemeCardProps {
  theme: "light" | "dark";
  onToggle: () => void;
}

export function ThemeCard({ theme, onToggle }: ThemeCardProps) {
  const ThemeIcon = theme === "light" ? Sun : Moon;
  return (
    <SettingsCard icon={<ThemeIcon size={20} strokeWidth={3} />} title="Theme">
      <p className="mb-4 font-bold text-text-600">
        Switch between light and dark mode
      </p>
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-center gap-3 border-4 border-black bg-text-50 px-5 py-5 font-black uppercase text-text-950 shadow-[5px_5px_0px_black] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_black] hover:bg-secondary"
      >
        {theme === "light" ? (
          <>
            <Moon size={22} strokeWidth={3} />
            Switch to Dark Mode
          </>
        ) : (
          <>
            <Sun size={22} strokeWidth={3} />
            Switch to Light Mode
          </>
        )}
      </button>
      <div className="mt-4 flex items-center gap-3 border-4 border-black bg-text-50 p-4">
        <div className="flex h-10 w-10 items-center justify-center border-2 border-black bg-primary text-primary-foreground">
          <ThemeIcon size={18} strokeWidth={3} />
        </div>
        <div>
          <p className="font-black uppercase text-text-950">
            Current Theme: {theme === "light" ? "Light" : "Dark"}
          </p>
          <p className="text-xs font-bold text-text-600">
            Your preference is saved locally
          </p>
        </div>
      </div>
    </SettingsCard>
  );
}
