"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getDefaultRoute } from "@/lib/roleRedirect";

/**
 * Hook to handle role-based redirects
 * Automatically redirects to appropriate page based on user role
 */
export function useRoleRedirect() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    const targetRoute = getDefaultRoute(user);
    if (targetRoute && typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      if (currentPath === "/" || currentPath === "") {
        router.push(targetRoute);
      }
    }
  }, [user, isLoading, router]);

  return { user, isLoading };
}
