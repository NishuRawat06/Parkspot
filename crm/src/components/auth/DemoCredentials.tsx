"use client";

import { useState } from "react";
import { ChevronDown, KeyRound } from "lucide-react";

const DEMO_ACCOUNTS = [
  { role: "Admin", email: "admin@parkspot.com", password: "admin123" },
  { role: "Manager", email: "manager@parkspot.com", password: "manager123" },
  { role: "Staff", email: "staff@parkspot.com", password: "staff123" },
];

interface DemoCredentialsProps {
  onFill: (email: string, password: string) => void;
}

export default function DemoCredentials({ onFill }: DemoCredentialsProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full max-w-xl mt-4 bg-background border border-text/10 rounded-xl shadow-2xl shadow-text-950/60 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-text/5"
      >
        <span className="flex items-center gap-2.5">
          <KeyRound size={15} className="text-primary" />
          <span
            className="text-text-500 text-[11px] tracking-[0.15em] uppercase"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Try it out — demo accounts
          </span>
        </span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-text-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="flex flex-col gap-2 border-t border-text/10 px-2 py-3">
          {DEMO_ACCOUNTS.map((account) => (
            <button
              key={account.role}
              type="button"
              onClick={() => onFill(account.email, account.password)}
              className="group flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-text/5"
            >
              <span
                className="text-primary text-xs font-medium shrink-0 w-16"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {account.role}
              </span>
              <span
                className="text-text-500 text-xs truncate"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {account.email}
              </span>
              <span className="text-text-500 text-xs opacity-0 transition-opacity group-hover:opacity-100 shrink-0">
                Fill →
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
