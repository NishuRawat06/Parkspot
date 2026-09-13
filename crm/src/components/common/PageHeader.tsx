import React from "react";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  variant?: "page" | "card";
  className?: string;
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  action,
  icon,
  variant = "page",
  className = "",
}: PageHeaderProps) {
  if (variant === "card") {
    return (
      <div
        className={`border-b-4 border-black bg-secondary px-5 py-6 md:px-8 ${className}`}
      >
        {eyebrow && (
          <p className="mb-2 text-sm font-black uppercase tracking-widest text-text-600">
            {eyebrow}
          </p>
        )}
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-black uppercase tracking-tight text-text-950 md:text-5xl">
            {title}
          </h1>
          {icon}
        </div>
      </div>
    );
  }

  return (
    <div className={`border-b-4 border-black pb-4 ${className}`}>
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          {eyebrow && (
            <p className="mb-1 text-xs font-black uppercase tracking-widest text-text-600">
              {eyebrow}
            </p>
          )}
          <h1 className="text-3xl font-black uppercase tracking-tight text-text-950 md:text-4xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-sm font-bold text-text-600">{subtitle}</p>
          )}
        </div>
        {action}
      </div>
    </div>
  );
}
