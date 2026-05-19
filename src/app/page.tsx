"use client";

import { useRoleRedirect } from "@/hooks/useRoleRedirect";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { isLoading } = useRoleRedirect();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
          <p className="text-slate-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  return null;
}
