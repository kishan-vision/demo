"use client";

import { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles?: string[];
  fallback?: ReactNode;
}

/**
 * Component to protect routes based on user roles
 * Usage: <RoleGuard allowedRoles={["SuperAdmin", "Admin"]}>
 *          <AdminPanel />
 *        </RoleGuard>
 */
export function RoleGuard({
  children,
  allowedRoles = [],
  fallback
}: RoleGuardProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

  if (!user) {
    return fallback || (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600">Not authenticated</p>
        </div>
      </div>
    );
  }

  // Check if user has required roles
  if (allowedRoles.length > 0) {
    const hasRequiredRole = allowedRoles.some(role =>
      user.roles.includes(role)
    );

    if (!hasRequiredRole) {
      return fallback || (
        <div className="flex h-screen w-full items-center justify-center">
          <div className="text-center">
            <p className="text-lg font-semibold text-slate-900">Access Denied</p>
            <p className="text-sm text-slate-600">
              You don't have permission to access this page
            </p>
            <p className="text-xs text-slate-500 mt-2">
              Required roles: {allowedRoles.join(", ")}
            </p>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
}
