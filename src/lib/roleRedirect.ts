import type { DecodedToken } from "@/types/auth";

/**
 * Determine the landing page based on user role
 */
export function getDefaultRoute(user: DecodedToken | null): string {
  if (!user) return "/";

  // Custom users → Products page
  if (user.roles.includes("Custom")) {
    return "/products";
  }

  // Super Admin → Dashboard
  if (user.roles.includes("Super Admin")) {
    return "/dashboard";
  }

  // Admin → Dashboard
  if (user.roles.includes("Admin")) {
    return "/dashboard";
  }

  // Default landing page
  return "/dashboard";
}

/**
 * Check if user has permission to access a route
 */
export function canAccessRoute(user: DecodedToken | null, route: string): boolean {
  if (!user) return false;

  // Check if route is in allowed_routes
  if (user.allowed_routes && !user.allowed_routes.includes(route)) {
    return false;
  }

  return true;
}

/**
 * Get the restricted message based on user role
 */
export function getAccessDeniedMessage(user: DecodedToken | null, route: string): string {
  if (!user) return "Not authenticated";

  return `User with role "${user.roles.join(", ")}" cannot access ${route}`;
}
