import type { AnalyticsStat, ChartDataPoint } from "@/types";

export const ANALYTICS_STATS: AnalyticsStat[] = [
  { id: "s1", label: "Page Views",      value: "128,430", subtitle: "Last 30 days" },
  { id: "s2", label: "Unique Visitors", value: "34,201",  subtitle: "Last 30 days" },
  { id: "s3", label: "Bounce Rate",     value: "38.4%",   subtitle: "Avg. last 30 days" },
  { id: "s4", label: "Avg. Session",    value: "3m 42s",  subtitle: "Duration per visit" },
  { id: "s5", label: "Conversions",     value: "2.7%",    subtitle: "Visitor → customer" },
  { id: "s6", label: "New Signups",     value: "1,204",   subtitle: "This month" },
];

export const MONTHLY_REVENUE: ChartDataPoint[] = [
  { label: "Jan", value: 32000 },
  { label: "Feb", value: 41000 },
  { label: "Mar", value: 38000 },
  { label: "Apr", value: 52000 },
  { label: "May", value: 47000 },
  { label: "Jun", value: 61000 },
  { label: "Jul", value: 55000 },
  { label: "Aug", value: 67000 },
  { label: "Sep", value: 72000 },
  { label: "Oct", value: 69000 },
  { label: "Nov", value: 84000 },
  { label: "Dec", value: 91000 },
];
