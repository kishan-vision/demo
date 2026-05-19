"use client";
import React from "react";
import { useSidebar } from "@/hooks/useSidebar";
import { SidebarLink } from "./SidebarLink";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, LayoutDashboard, Users, Package, ShoppingCart, BarChart2, Settings } from "lucide-react";
import type { NavItem } from "@/types";

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Users",     href: "/users",     icon: Users            },
  { label: "Products",  href: "/products",  icon: Package          },
  { label: "Orders",    href: "/orders",    icon: ShoppingCart     },
  { label: "Analytics", href: "/analytics", icon: BarChart2        },
  { label: "Settings",  href: "/settings",  icon: Settings         },
];

export function Sidebar() {
  const { collapsed, toggle } = useSidebar();

  return (
    <aside className={`${collapsed ? "w-16" : "w-64"} bg-white border-r border-slate-200 flex flex-col transition-all duration-300 hidden md:flex`}>
      <div className="h-16 flex items-center justify-center border-b border-slate-200">
        <div className="text-sm font-bold text-slate-900">{collapsed ? "AD" : "Admin"}</div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {NAV_ITEMS.map(item => (
          <SidebarLink key={item.href} item={item} collapsed={collapsed} />
        ))}
      </nav>

      <div className="p-4 border-t border-slate-200">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggle}
          className="w-full"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
    </aside>
  );
}
