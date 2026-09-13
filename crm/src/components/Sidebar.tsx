"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { menuItems } from "./sidebar/menu-config";
import SidebarItem from "./sidebar/SidebarItem";

function SidebarLogo() {
  return (
    <Link
      href="/"
      className="flex h-24 items-center gap-3 border-b-4 border-black bg-sidebar px-5"
    >
      <div className="flex h-16 w-16 items-center justify-center border-4 border-black bg-primary shadow-[5px_5px_0px_#000]">
        <Image
          src="/logo.png"
          alt="ParkSpot logo"
          width={52}
          height={52}
          className="object-contain"
        />
      </div>
      <div>
        <h1 className="text-xl font-black tracking-tight text-sidebar-foreground">
          ParkSpot
        </h1>
        <p className="text-xs font-bold uppercase tracking-wide text-primary">
          Parking Management
        </p>
      </div>
    </Link>
  );
}

const Sidebar = () => {
  const { hasPermission } = useAuth();
  const visible = menuItems.filter(
    (item) => !item.permission || hasPermission(item.permission),
  );

  return (
    <aside className="flex min-h-screen w-72 flex-col border-r-4 border-black bg-sidebar text-sidebar-foreground">
      <SidebarLogo />
      <nav className="flex-1 px-4 py-7">
        <p className="mb-4 px-2 text-xs font-black uppercase tracking-[0.15em] text-sidebar-foreground/40">
          Menu
        </p>
        <div className="flex flex-col space-y-3">
          {visible.map((item) => (
            <SidebarItem
              key={item.name}
              item={item}
              hasPermission={hasPermission}
            />
          ))}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
