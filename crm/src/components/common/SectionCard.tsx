import React from "react";

interface SectionCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

export function SectionCard({ icon, title, children }: SectionCardProps) {
  return (
    <section>
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center border-4 border-black bg-primary">
          {icon}
        </div>
        <h2 className="text-lg font-black uppercase text-text-950">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export function SectionDivider() {
  return <div className="h-1 bg-text-950" />;
}
