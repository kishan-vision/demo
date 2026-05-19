import { KpiCard } from "@/components/dashboard/KpiCard";
import { ActivityList } from "@/components/dashboard/ActivityList";
import { KPI_METRICS, ACTIVITY_ITEMS } from "@/data/dashboard";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-2">Welcome back! Here&apos;s your performance overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {KPI_METRICS.map(metric => (
          <KpiCard key={metric.id} metric={metric} />
        ))}
      </div>

      <ActivityList items={ACTIVITY_ITEMS} />
    </div>
  );
}
