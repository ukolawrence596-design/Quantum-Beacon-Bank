export interface StatementFilterProps {
  periods: string[];
  activePeriod: string;
  onSelect: (period: string) => void;
}

export default function StatementFilter({ periods, activePeriod, onSelect }: StatementFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 bg-[var(--bg-elevated)] border border-[var(--border-primary)] rounded-3xl p-4">
      {periods.map((period) => (
        <button
          key={period}
          type="button"
          onClick={() => onSelect(period)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${activePeriod === period ? "bg-[#ccff00] text-[#0d0d0d]" : "bg-[var(--bg-input)] text-[var(--text-primary)]"}`}
        >
          {period}
        </button>
      ))}
    </div>
  );
}
