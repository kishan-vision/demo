"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/types";

interface SidebarLinkProps {
  item: NavItem;
  collapsed: boolean;
}

export function SidebarLink({ item, collapsed }: SidebarLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

  return (
    <Link
      href={item.href}
      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
        isActive
          ? "bg-slate-100 text-slate-900 font-medium"
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
      }`}
    >
      <item.icon className="h-5 w-5 flex-shrink-0" />
      <span className={`text-sm ${collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"} transition-opacity duration-300`}>
        {item.label}
      </span>
    </Link>
  );
}
