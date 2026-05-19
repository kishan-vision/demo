import type { ActivityItem } from "@/types";
import { Users, DollarSign, ShoppingCart, Package } from "lucide-react";

export const KPI_METRICS = [
  { id: "users",    label: "Total Users",   value: "4,281",    delta: "+12% from last month", deltaPositive: true,  icon: Users        },
  { id: "revenue",  label: "Revenue",       value: "$48,295",  delta: "+8.2% from last month", deltaPositive: true,  icon: DollarSign   },
  { id: "orders",   label: "Orders",        value: "1,073",    delta: "-3.1% from last month", deltaPositive: false, icon: ShoppingCart },
  { id: "products", label: "Products",      value: "342",      delta: "+5 new this month",     deltaPositive: true,  icon: Package      },
];

export const ACTIVITY_ITEMS: ActivityItem[] = [
  { id: "a1", description: "Alice Johnson placed order ORD-1001",         timestamp: "2 minutes ago",  type: "order"   },
  { id: "a2", description: "New user James Anderson registered",           timestamp: "15 minutes ago", type: "user"    },
  { id: "a3", description: "Product 'Wireless Headphones' restocked",      timestamp: "1 hour ago",     type: "product" },
  { id: "a4", description: "Order ORD-0998 marked as Delivered",           timestamp: "2 hours ago",    type: "order"   },
  { id: "a5", description: "System maintenance window completed",           timestamp: "5 hours ago",    type: "system"  },
  { id: "a6", description: "Eva Martinez updated her profile",              timestamp: "1 day ago",      type: "user"    },
  { id: "a7", description: "Product 'Running Shoes' went Out of Stock",    timestamp: "1 day ago",      type: "product" },
];
