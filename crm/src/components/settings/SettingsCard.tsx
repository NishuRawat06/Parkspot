import React from "react";

interface SettingsCardProps {
  icon: React.ReactNode;
  title: string;
  tone?: "primary" | "danger";
  children: React.ReactNode;
}

export function SettingsCard({
  icon,
  title,
  tone = "primary",
  children,
}: SettingsCardProps) {
  return (
    <div className="border-4 border-black bg-background shadow-[5px_5px_0px_black]">
      <div className="flex items-center border-b-4 border-black bg-secondary px-5 py-4">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center border-4 border-black ${
              tone === "danger" ? "bg-error" : "bg-primary"
            }`}
          >
            {icon}
          </div>
          <h2 className="text-lg font-black uppercase text-text-950">
            {title}
          </h2>
        </div>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}
