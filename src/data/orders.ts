import type { Order } from "@/types";

export const ORDERS: Order[] = [
  { id: "o1",  orderNumber: "ORD-1001", customer: "Alice Johnson",  date: "2024-01-10", status: "Delivered",  total: 114.98, items: 2 },
  { id: "o2",  orderNumber: "ORD-1002", customer: "Bob Smith",      date: "2024-01-12", status: "Shipped",    total: 34.99,  items: 1 },
  { id: "o3",  orderNumber: "ORD-1003", customer: "Carol Williams", date: "2024-01-14", status: "Processing", total: 269.95, items: 3 },
  { id: "o4",  orderNumber: "ORD-1004", customer: "David Brown",    date: "2024-01-15", status: "Pending",    total: 19.99,  items: 1 },
  { id: "o5",  orderNumber: "ORD-1005", customer: "Eva Martinez",   date: "2024-01-16", status: "Cancelled",  total: 89.95,  items: 1 },
  { id: "o6",  orderNumber: "ORD-1006", customer: "Frank Lee",      date: "2024-01-17", status: "Delivered",  total: 63.50,  items: 2 },
  { id: "o7",  orderNumber: "ORD-1007", customer: "Grace Kim",      date: "2024-01-18", status: "Shipped",    total: 44.00,  items: 1 },
  { id: "o8",  orderNumber: "ORD-1008", customer: "Henry Wilson",   date: "2024-01-19", status: "Processing", total: 184.98, items: 3 },
  { id: "o9",  orderNumber: "ORD-1009", customer: "Irene Taylor",   date: "2024-01-20", status: "Pending",    total: 54.99,  items: 1 },
  { id: "o10", orderNumber: "ORD-1010", customer: "James Anderson", date: "2024-01-21", status: "Delivered",  total: 79.99,  items: 1 },
];
