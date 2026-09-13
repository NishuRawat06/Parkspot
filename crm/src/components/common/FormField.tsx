import React from "react";

interface FormFieldProps {
  id?: string;
  label: string;
  icon?: React.ReactNode;
  hint?: string;
  children: React.ReactNode;
}

export function FormField({ id, label, icon, hint, children }: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-3 flex items-center gap-2 text-sm font-black uppercase text-text-950"
      >
        {icon}
        {label}
      </label>
      {children}
      {hint && <p className="mt-2 text-xs font-bold text-text-600">{hint}</p>}
    </div>
  );
}

export const brutalInputClass =
  "h-16 w-full border-4 border-black bg-text-50 px-5 font-bold text-text-950 placeholder:text-text-500 outline-none transition-all focus:bg-secondary focus:shadow-[5px_5px_0px_var(--color-accent)]";
