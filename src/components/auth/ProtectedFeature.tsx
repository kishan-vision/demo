"use client";

import { useAuth } from "@/context/AuthContext";
import { PermissionsService } from "@/services/permissions";

interface ProtectedFeatureProps {
  action: string;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export function ProtectedFeature({
  action,
  fallback = <p className="text-sm text-slate-500">You don&apos;t have access to this feature.</p>,
  children,
}: ProtectedFeatureProps) {
  const { user } = useAuth();

  if (!PermissionsService.canPerform(user, action)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
