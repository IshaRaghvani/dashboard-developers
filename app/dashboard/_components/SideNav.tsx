'use client';
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LibraryBig, MessageCircleMore, AreaChart, Settings, ShieldAlert } from "lucide-react";

interface Menu {
  id: number;
  title: string;
  icon: React.FC<any>;
  path: string;
}

const menuList: Menu[] = [
  {
    id: 1,
    title: "Overview",
    icon: LibraryBig,
    path: "/overview",
  },
  
  {
    id: 2,
    title: "Analysis",
    icon: AreaChart,
    path: "/analysis",
  },
  {
    id: 3,
    title: "Settings",
    icon: Settings,
    path: "/dashboard/settings",
  },
  {
    id: 4,
    title: "Upgrade",
    icon: ShieldAlert,
    path: "/dashboard/upgrades",
  },
];

function SideNav(): JSX.Element {
  const path = usePathname();

  return (
    <div className="h-screen shadow-md border">
      <div className="p-4 pb-8">
        {menuList.map((menu) => (
          <Link key={menu.id} href={menu.path}>
            <h2
              className={`flex items-center gap-5 p-3 hover:bg-primary hover:text-white rounded-lg cursor-pointer ${
                path === menu.path ? "bg-primary text-white" : ""
              }`}
            >
              <menu.icon /> {menu.title}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SideNav;
