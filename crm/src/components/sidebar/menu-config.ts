import {
  BarChart3,
  CalendarCheck,
  LayoutDashboard,
  MapPin,
  Settings,
  Shield,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface MenuSubLink {
  label: string;
  link: string;
  permission?: string;
}

export interface MenuItem {
  name: string;
  icon: LucideIcon;
  link?: string;
  permission?: string;
  subLinks?: MenuSubLink[];
}

export const menuItems: MenuItem[] = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    link: "/",
    permission: "dashboard:view",
  },
  {
    name: "Bookings",
    icon: CalendarCheck,
    permission: "bookings:view",
    subLinks: [
      {
        label: "Add Booking",
        link: "/Bookings/add",
        permission: "bookings:create",
      },
      { label: "All Bookings", link: "/Bookings", permission: "bookings:view" },
    ],
  },
  {
    name: "Parking Locations",
    icon: MapPin,
    permission: "locations:view",
    subLinks: [
      {
        label: "Add Location",
        link: "/Locations/add",
        permission: "locations:create",
      },
      {
        label: "All Locations",
        link: "/Locations",
        permission: "locations:view",
      },
    ],
  },
  {
    name: "Reports",
    icon: BarChart3,
    link: "/Reports",
    permission: "reports:view",
  },
  {
    name: "Users",
    icon: Users,
    link: "/Users",
    permission: "users:view",
  },
  {
    name: "Roles & Permissions",
    icon: Shield,
    link: "/Roles",
    permission: "roles:view",
  },
  {
    name: "Settings",
    icon: Settings,
    link: "/Settings",
    permission: "settings:view",
  },
];
