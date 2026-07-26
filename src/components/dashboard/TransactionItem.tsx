import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatRelativeTime } from "../../utils/formatDate";

export interface Transaction {
  id: string;
  sender_id: string;
  receiver_id: string;
  sender_account: string;
  receiver_account: string;
  amount: number;
  type: string;
  status: string;
  note: string;
  reference: string;
  created_at: string;
}

export interface TransactionItemProps {
  transaction: Transaction;
  currentUserId?: string;
}

export default function TransactionItem({ transaction, currentUserId }: TransactionItemProps) {
  const isReceive = transaction.receiver_id === currentUserId;
  const txColor = isReceive ? "#22c55e" : "#ef4444";
  const statusColor =
    transaction.status === "successful"
      ? "#22c55e"
      : transaction.status === "processing"
      ? "#f59e0b"
      : "#ef4444";

  return (
    <div className="flex items-center gap-4 p-3 rounded-xl transition-all duration-200 hover:scale-[1.01]" style={{ background: "var(--bg-hover)" }}>
      <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm" style={{ background: `${txColor}15`, color: txColor }}>
        {isReceive ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold truncate" style={{ color: "var(--text-primary)" }}>
          {isReceive ? `From: ${transaction.sender_account}` : `To: ${transaction.receiver_account}`}
        </p>
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          {formatRelativeTime(transaction.created_at)} • {transaction.reference}
        </p>
      </div>

      <div className="hidden sm:flex px-2 py-1 rounded-full text-xs font-medium capitalize" style={{ background: `${statusColor}15`, color: statusColor }}>
        {transaction.status}
      </div>

      <p className="text-sm font-bold shrink-0" style={{ color: txColor }}>
        {isReceive ? "+" : "-"}
        {formatCurrency(transaction.amount)}
      </p>
    </div>
  );
}
