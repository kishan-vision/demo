import { Card } from "@/components/ui/card";
import type { AnalyticsStat } from "@/types";

interface StatCardProps {
  stat: AnalyticsStat;
}

export function StatCard({ stat }: StatCardProps) {
  return (
    <Card className="p-6 bg-white">
      <p className="text-sm text-slate-600 font-medium">{stat.label}</p>
      <p className="text-2xl font-bold text-slate-900 mt-2">{stat.value}</p>
      <p className="text-xs text-slate-500 mt-2">{stat.subtitle}</p>
    </Card>
  );
}
