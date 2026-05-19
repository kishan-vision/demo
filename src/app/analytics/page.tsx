import { StatCard } from "@/components/analytics/StatCard";
import { BarChart } from "@/components/analytics/BarChart";
import { ANALYTICS_STATS, MONTHLY_REVENUE } from "@/data/analytics";

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>
        <p className="text-slate-600 mt-2">Track key metrics and performance data.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ANALYTICS_STATS.map(stat => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChart title="Monthly Revenue" data={MONTHLY_REVENUE} />
        <BarChart title="Monthly Orders" data={MONTHLY_REVENUE} />
      </div>
    </div>
  );
}
