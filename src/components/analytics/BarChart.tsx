import { Card } from "@/components/ui/card";
import type { ChartDataPoint } from "@/types";

interface BarChartProps {
  title: string;
  data: ChartDataPoint[];
}

export function BarChart({ title, data }: BarChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <Card className="p-6 bg-white">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">{title}</h3>
      <div className="flex items-end justify-between gap-2 h-64">
        {data.map(point => (
          <div key={point.label} className="flex flex-col items-center flex-1 gap-2">
            <div className="w-full bg-slate-100 rounded-t flex items-end justify-center relative" style={{ height: `${(point.value / maxValue) * 240}px` }}>
              <div className="w-3/4 bg-slate-400 rounded-t" style={{ height: "100%" }} />
            </div>
            <span className="text-xs text-slate-600 font-medium">{point.label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
