import type { DecodedToken } from "@/types/auth";

export enum UserRole {
  SUPER_ADMIN = "Super Admin",
  ADMIN = "Admin",
  DEV = "Dev",
  CUSTOM = "Custom",
}

export class PermissionsService {
  /**
   * Check if user is Super Admin
   */
  static isSuperAdmin(user: DecodedToken | null): boolean {
    return user?.user_type?.includes(UserRole.SUPER_ADMIN) ?? false;
  }

  /**
   * Check if user is Admin or above (Admin, Dev, Super Admin)
   */
  static isAdmin(user: DecodedToken | null): boolean {
    return (
      user?.user_type?.includes(UserRole.ADMIN) ||
      user?.user_type?.includes(UserRole.DEV) ||
      user?.user_type?.includes(UserRole.SUPER_ADMIN)
    ) ?? false;
  }

  /**
   * Check if user is Dev
   */
  static isDev(user: DecodedToken | null): boolean {
    return user?.user_type?.includes(UserRole.DEV) ?? false;
  }

  /**
   * Check if user is Custom-only (no elevated roles)
   */
  static isCustomOnly(user: DecodedToken | null): boolean {
    return (
      user?.user_type?.length === 1 &&
      user?.user_type?.[0] === UserRole.CUSTOM
    ) ?? false;
  }

  /**
   * Check if user has access to a specific brand
   * Admins have access to all brands; Custom users check their brand_ids
   */
  static hasBrandAccess(user: DecodedToken | null, brandId: string): boolean {
    if (this.isAdmin(user)) {
      return true;
    }

    return user?.brand_ids?.includes(brandId) ?? false;
  }

  /**
   * Get per-brand role for a user (e.g., "Main CS", "Editor")
   * custom_role_types format: ["brandId:Role", "brandId:Role"]
   */
  static getBrandRole(user: DecodedToken | null, brandId: string): string | null {
    const roleString = user?.custom_role_types?.find((rt) =>
      rt.startsWith(`${brandId}:`)
    );

    if (!roleString) return null;

    const [, role] = roleString.split(":");
    return role;
  }

  /**
   * Get all accessible brands for a user
   * Admins can access all (return empty array = all)
   * Custom users return their specific brand_ids
   */
  static getAccessibleBrands(user: DecodedToken | null): string[] {
    if (this.isAdmin(user)) {
      return [];
    }

    return user?.brand_ids ?? [];
  }

  /**
   * Check if user can perform a specific action (RBAC permission matrix)
   */
  static canPerform(user: DecodedToken | null, action: string): boolean {
    const permissions: Record<string, (user: DecodedToken | null) => boolean> = {
      // Read actions (any authenticated user)
      "spy:view_dashboard": (u) => !!u,
      "spy:view_reports": (u) => !!u,
      "spy:view_analytics": (u) => !!u,

      // Write actions (Admin and above)
      "spy:create_campaign": (u) => this.isAdmin(u),
      "spy:edit_campaign": (u) => this.isAdmin(u),
      "spy:delete_campaign": (u) => this.isAdmin(u),

      // Admin-only actions
      "spy:manage_users": (u) => this.isAdmin(u),

      // Super Admin only
      "spy:manage_settings": (u) => this.isSuperAdmin(u),

      // Export data: admin or not custom-only
      "spy:export_data": (u) => this.isAdmin(u) || !this.isCustomOnly(u),
    };

    const checker = permissions[action];
    if (!checker) {
      console.warn(`[RBAC] Unknown action: ${action}`);
      return false;
    }

    return checker(user);
  }
}
