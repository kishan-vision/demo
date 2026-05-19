import { Card } from "@/components/ui/card";
import type { KpiMetric } from "@/types";

interface KpiCardProps {
  metric: KpiMetric;
}

export function KpiCard({ metric }: KpiCardProps) {
  const Icon = metric.icon;

  return (
    <Card className="p-6 bg-white">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-slate-600 font-medium">{metric.label}</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">{metric.value}</p>
          <p className={`text-sm mt-2 ${metric.deltaPositive ? "text-green-600" : "text-red-600"}`}>
            {metric.delta}
          </p>
        </div>
        <div className="text-slate-300">
          <Icon className="h-8 w-8" />
        </div>
      </div>
    </Card>
  );
}
