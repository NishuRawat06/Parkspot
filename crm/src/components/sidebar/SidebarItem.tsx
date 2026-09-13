"use client";

import Button from "../buttons";
import type { MenuItem } from "./menu-config";

interface SidebarItemProps {
  item: MenuItem;
  hasPermission: (permission: string) => boolean;
}

export default function SidebarItem({ item, hasPermission }: SidebarItemProps) {
  const visibleSubLinks = item.subLinks?.filter(
    (sub) => !sub.permission || hasPermission(sub.permission),
  );

  if (item.subLinks && visibleSubLinks?.length === 0) return null;

  return (
    <Button
      key={item.name}
      label={item.name}
      Icon={item.icon}
      link={item.link}
      subLinks={visibleSubLinks}
    />
  );
}
