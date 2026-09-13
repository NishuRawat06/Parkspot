"use client";

import { LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ButtonProps {
  Icon: typeof LayoutDashboard;
  label: string;
  link?: string;
  subLinks?: {
    label: string;
    link: string;
  }[];
}

export default function Button({ Icon, label, link, subLinks = [] }: ButtonProps) {
  const pathname = usePathname();
  const id = label.toLowerCase().replaceAll(" ", "");

  const iconBox = (
    <span className="border-2 border-black bg-background p-2 text-sidebar-foreground">
      <Icon />
    </span>
  );

  if (link) {
    const isActive =
      link === "/" ? pathname === "/" : pathname.startsWith(link);

    return (
      <div className="border-4 border-black shadow-custom">
        <Link
          href={link}
          className={`
            flex items-center gap-4 p-4 text-xl
            ${isActive ? "bg-primary text-primary-foreground" : "text-sidebar-foreground hover:bg-primary/30"}
          `}
        >
          {iconBox}

          <span>{label}</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="border-4 border-black shadow-custom">
      <input id={id} type="radio" className="hidden peer" name="menu-items" />

      <label
        htmlFor={id}
        className="
          flex items-center gap-4 p-4 cursor-pointer text-sidebar-foreground
          peer-checked:bg-primary
          peer-checked:text-primary-foreground
        "
      >
        {iconBox}

        <p className="text-xl">{label}</p>
      </label>

      {subLinks.length > 0 && (
        <div
          className="
            grid grid-rows-[0fr]
            peer-checked:grid-rows-[1fr]
            transition-[grid-template-rows] duration-300
          "
        >
          <div className="overflow-hidden">
            <div className="border-t-2 border-black bg-background p-3">
              {subLinks.map((subLink) => (
                <Link
                  key={subLink.label}
                  href={subLink.link}
                  className="
                    block p-3 pl-12
                    text-lg
                    border-b-2 border-black
                    hover:bg-primary
                    hover:text-primary-foreground
                  "
                >
                  {subLink.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
