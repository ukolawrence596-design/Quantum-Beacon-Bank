import { useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Activity, TrendingDown, TrendingUp } from "lucide-react";

export interface ActivityPoint {
  label: string;
  value: number;
}

export interface ActivityChartProps {
  data?: ActivityPoint[];
  title?: string;
  subtitle?: string;
}

const fallbackData: ActivityPoint[] = [
  { label: "Mon", value: 120 },
  { label: "Tue", value: 180 },
  { label: "Wed", value: 160 },
  { label: "Thu", value: 240 },
  { label: "Fri", value: 220 },
  { label: "Sat", value: 300 },
  { label: "Sun", value: 280 },
];

export default function ActivityChart({
  data,
  title = "Activity Overview",
  subtitle = "Customer movement and transaction momentum",
}: ActivityChartProps) {
  const chartData = useMemo(() => (data && data.length ? data : fallbackData), [data]);

  const totalActivity = chartData.reduce((sum, item) => sum + item.value, 0);
  const firstValue = chartData[0]?.value ?? 0;
  const lastValue = chartData[chartData.length - 1]?.value ?? 0;
  const trend = lastValue - firstValue;

  return (
    <div
      className="rounded-3xl p-6 flex flex-col gap-5"
      style={{
        background: "var(--bg-elevated)",
        border: "1px solid var(--border-primary)",
      }}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(239,68,68,0.12)", color: "#ef4444" }}
            >
              <Activity size={16} />
            </div>
            <div>
              <h3
                className="font-heading font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                {title}
              </h3>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                {subtitle}
              </p>
            </div>
          </div>
        </div>

        <div
          className="flex items-center gap-2 px-3 py-2 rounded-full text-sm"
          style={{ background: "var(--bg-hover)", color: "var(--text-secondary)" }}
        >
          {trend >= 0 ? (
            <TrendingUp size={14} style={{ color: "#22c55e" }} />
          ) : (
            <TrendingDown size={14} style={{ color: "#ef4444" }} />
          )}
          <span className="font-semibold">
            {trend >= 0 ? "+" : ""}
            {trend}
          </span>
          <span className="text-xs opacity-80">this week</span>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <div
          className="rounded-2xl p-3"
          style={{ background: "var(--bg-hover)", border: "1px solid var(--border-primary)" }}
        >
          <p className="text-xs uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
            Total activity
          </p>
          <p className="text-xl font-heading font-black" style={{ color: "var(--text-primary)" }}>
            {totalActivity}
          </p>
        </div>
        <div
          className="rounded-2xl p-3"
          style={{ background: "var(--bg-hover)", border: "1px solid var(--border-primary)" }}
        >
          <p className="text-xs uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
            Peak day
          </p>
          <p className="text-xl font-heading font-black" style={{ color: "var(--text-primary)" }}>
            {chartData.reduce((peak, item) => (item.value > peak.value ? item : peak), chartData[0] ?? fallbackData[0]).label}
          </p>
        </div>
        <div
          className="rounded-2xl p-3"
          style={{ background: "var(--bg-hover)", border: "1px solid var(--border-primary)" }}
        >
          <p className="text-xs uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
            Avg. daily
          </p>
          <p className="text-xl font-heading font-black" style={{ color: "var(--text-primary)" }}>
            {Math.round(totalActivity / chartData.length)}
          </p>
        </div>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="activityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#ef4444" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.08)" />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: "var(--text-muted)" }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: "var(--text-muted)" }}
            />
            <Tooltip
              cursor={{ stroke: "#ef4444", strokeWidth: 1 }}
              contentStyle={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-primary)",
                borderRadius: "12px",
                color: "var(--text-primary)",
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#ef4444"
              strokeWidth={3}
              fill="url(#activityGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
