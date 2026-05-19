import { OrdersTable } from "@/components/orders/OrdersTable";
import { ORDERS } from "@/data/orders";

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Orders</h1>
        <p className="text-slate-600 mt-2">Track and manage all customer orders.</p>
      </div>

      <OrdersTable orders={ORDERS} />
    </div>
  );
}
