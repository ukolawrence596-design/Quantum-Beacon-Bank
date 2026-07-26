import { formatCurrency } from "../../utils/formatCurrency";

export interface SpendingCategory {
  name: string;
  amount: number;
  color: string;
}

export interface SpendingChartProps {
  categories: SpendingCategory[];
}

export default function SpendingChart({ categories }: SpendingChartProps) {
  const total = categories.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="rounded-3xl p-6 bg-[var(--bg-elevated)] border border-[var(--border-primary)]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-bold" style={{ color: "var(--text-primary)" }}>
            Spending Chart
          </h3>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Breakdown by category for the last month.
          </p>
        </div>
        <p className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>
          Total {formatCurrency(total)}
        </p>
      </div>

      <div className="space-y-4">
        {categories.map((category) => {
          const ratio = total > 0 ? category.amount / total : 0;
          return (
            <div key={category.name} className="space-y-2">
              <div className="flex items-center justify-between text-sm" style={{ color: "var(--text-secondary)" }}>
                <span>{category.name}</span>
                <span>{formatCurrency(category.amount)}</span>
              </div>
              <div className="h-3 rounded-full bg-[var(--bg-input)] overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${ratio * 100}%`, background: category.color }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
