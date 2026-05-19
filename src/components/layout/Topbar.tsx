"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar";

const PAGE_TITLES: Record<string, { title: string; breadcrumb: string[] }> = {
  "/dashboard": { title: "Dashboard",  breadcrumb: ["Home", "Dashboard"]  },
  "/users":     { title: "Users",      breadcrumb: ["Home", "Users"]      },
  "/products":  { title: "Products",   breadcrumb: ["Home", "Products"]   },
  "/orders":    { title: "Orders",     breadcrumb: ["Home", "Orders"]     },
  "/analytics": { title: "Analytics",  breadcrumb: ["Home", "Analytics"]  },
  "/settings":  { title: "Settings",   breadcrumb: ["Home", "Settings"]   },
};

export function Topbar() {
  const pathname = usePathname();
  const page = PAGE_TITLES[pathname] || { title: "Page", breadcrumb: ["Home"] };
  const [open, setOpen] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-1">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <Sidebar />
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-2">
          <nav className="flex items-center gap-2 text-sm text-slate-500">
            {page.breadcrumb.map((item, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span>/</span>}
                <span className={idx === page.breadcrumb.length - 1 ? "text-slate-900 font-medium" : ""}>
                  {item}
                </span>
              </React.Fragment>
            ))}
          </nav>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-sm font-medium text-slate-700">
          AJ
        </div>
      </div>
    </header>
  );
}

import React from "react";
