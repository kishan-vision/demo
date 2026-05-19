"use client";
import { useState, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Order, OrderStatus } from "@/types";

interface OrdersTableProps {
  orders: Order[];
}

const ORDER_STATUSES: OrderStatus[] = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

const STATUS_CLASSES: Record<OrderStatus, string> = {
  Pending:    "bg-slate-100 text-slate-700",
  Processing: "bg-blue-100 text-blue-700",
  Shipped:    "bg-indigo-100 text-indigo-700",
  Delivered:  "bg-green-100 text-green-700",
  Cancelled:  "bg-red-100 text-red-700",
};

export function OrdersTable({ orders }: OrdersTableProps) {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | "all">("all");

  const filtered = useMemo(() => {
    if (selectedStatus === "all") return orders;
    return orders.filter(o => o.status === selectedStatus);
  }, [orders, selectedStatus]);

  return (
    <div className="space-y-4">
      <Select value={selectedStatus} onValueChange={(val) => setSelectedStatus(val as OrderStatus | "all")}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          {ORDER_STATUSES.map(status => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="border border-slate-200 rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead>Order #</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(order => (
              <TableRow key={order.id}>
                <TableCell className="font-medium text-slate-900">{order.orderNumber}</TableCell>
                <TableCell className="text-slate-900">{order.customer}</TableCell>
                <TableCell className="text-slate-600">{order.date}</TableCell>
                <TableCell className="text-slate-600">{order.items}</TableCell>
                <TableCell className="font-medium">${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={STATUS_CLASSES[order.status]}>
                    {order.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
