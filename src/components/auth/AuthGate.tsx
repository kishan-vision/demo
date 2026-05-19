"use client";

import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

interface AuthGateProps {
  children: React.ReactNode;
}

export function AuthGate({ children }: AuthGateProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
          <p className="text-slate-600">Waiting for authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4 rounded-lg border border-slate-200 bg-white p-8">
          <div className="text-lg font-semibold text-slate-900">Authentication Failed</div>
          <p className="text-sm text-slate-600">
            Please reload this page from the main Acentecom app to continue.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
