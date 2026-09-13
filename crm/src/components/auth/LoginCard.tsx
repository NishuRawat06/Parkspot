"use client";

import React from "react";

interface LoginCardProps {
  email: string;
  password: string;
  submitting: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

function LoginField({
  label,
  ...props
}: React.ComponentProps<"input"> & { label: string }) {
  return (
    <div className="group flex flex-col gap-2">
      <label
        className="text-primary text-xs tracking-[0.15em] uppercase"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        {label}
      </label>
      <input
        className="bg-transparent text-text text-lg px-1 py-2 focus:outline-none transition-colors placeholder:text-text-500"
        style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}
        {...props}
      />
    </div>
  );
}

export default function LoginCard({
  email,
  password,
  submitting,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: LoginCardProps) {
  return (
    <div className="w-full max-w-xl">
      <h1
        className="text-text text-3xl sm:text-4xl mb-8"
        style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
      >
        <span className="italic text-primary">Login</span>
      </h1>

      <form
        className="flex flex-col gap-7 bg-background border border-text/10 rounded-xl p-6 sm:p-8 shadow-2xl shadow-text-950/60"
        onSubmit={onSubmit}
      >
        <LoginField
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          required
        />
        <LoginField
          label="Password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          required
          minLength={6}
        />

        <button
          type="submit"
          disabled={submitting}
          className="group inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-medium py-3 rounded-md hover:bg-primary/80 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Login
          {submitting ? (
            <span className="w-3.5 h-3.5 rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground animate-spin" />
          ) : (
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          )}
        </button>
      </form>
    </div>
  );
}
