export interface TransactionStatusBadgeProps {
  status?: string;
  compact?: boolean;
}

const STATUS_META: Record<string, { label: string; color: string; bg: string }> = {
  successful: { label: "Successful", color: "#22c55e", bg: "rgba(34,197,94,0.1)" },
  processing: { label: "Processing", color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  failed: { label: "Failed", color: "#ef4444", bg: "rgba(239,68,68,0.1)" },
  cancelled: { label: "Cancelled", color: "#6b7280", bg: "rgba(107,114,128,0.1)" },
  pending: { label: "Pending", color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
};

export default function TransactionStatusBadge({ status = "pending", compact = false }: TransactionStatusBadgeProps) {
  const meta = STATUS_META[status.toLowerCase()] ?? STATUS_META.pending;

  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold capitalize ${compact ? "px-2 py-1 text-[10px]" : "px-2.5 py-1 text-xs"}`}
      style={{ background: meta.bg, color: meta.color }}
    >
      {meta.label}
    </span>
  );
}
