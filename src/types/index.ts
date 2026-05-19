export interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface KpiMetric {
  id: string;
  label: string;
  value: string;
  delta: string;
  deltaPositive: boolean;
  icon: React.ComponentType<{ className?: string }>;
}

export interface ActivityItem {
  id: string;
  description: string;
  timestamp: string;
  type: "user" | "order" | "product" | "system";
}

export type UserRole = "Admin" | "Editor" | "Viewer" | "Moderator";
export type UserStatus = "Active" | "Inactive" | "Pending";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  joinDate: string;
  avatarUrl?: string;
}

export type ProductStatus = "In Stock" | "Low Stock" | "Out of Stock";
export type ProductCategory = "Electronics" | "Clothing" | "Home" | "Books" | "Food";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  stock: number;
  status: ProductStatus;
  sku: string;
}

export type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";

export interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: number;
}

export interface AnalyticsStat {
  id: string;
  label: string;
  value: string;
  subtitle: string;
}

export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface UserProfile {
  fullName: string;
  email: string;
  bio: string;
  role: string;
}

export interface AppPreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  weeklyDigest: boolean;
  darkMode: boolean;
  compactView: boolean;
  autoSave: boolean;
}

export type SortDirection = "asc" | "desc" | null;
export interface SortState<T extends string = string> {
  column: T;
  direction: SortDirection;
}
