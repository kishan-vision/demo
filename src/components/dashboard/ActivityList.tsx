import { Card } from "@/components/ui/card";
import type { ActivityItem } from "@/types";

interface ActivityListProps {
  items: ActivityItem[];
}

const TYPE_COLORS: Record<string, string> = {
  user: "bg-blue-500",
  order: "bg-green-500",
  product: "bg-purple-500",
  system: "bg-slate-500",
};

export function ActivityList({ items }: ActivityListProps) {
  return (
    <Card className="p-6 bg-white">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id} className="flex items-start gap-4">
            <div className={`h-3 w-3 rounded-full flex-shrink-0 mt-2 ${TYPE_COLORS[item.type]}`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-900">{item.description}</p>
              <p className="text-xs text-slate-500 mt-1">{item.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
