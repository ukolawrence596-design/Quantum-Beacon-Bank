import TransactionItem, { Transaction } from "./TransactionItem";

export interface RecentTransactionsProps {
  transactions: Transaction[];
  currentUserId?: string;
  loading?: boolean;
}

export default function RecentTransactions({
  transactions,
  currentUserId,
  loading = false,
}: RecentTransactionsProps) {
  return (
    <div className="rounded-3xl p-6 bg-[var(--bg-elevated)] border border-[var(--border-primary)]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-heading font-bold" style={{ color: "var(--text-primary)" }}>
          Recent Transactions
        </h3>
        <span className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
          Latest activity
        </span>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((index) => (
            <div key={index} className="h-16 rounded-xl bg-[var(--bg-input)] animate-pulse" />
          ))}
        </div>
      ) : transactions.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
            No recent transactions
          </p>
          <p className="mt-2 text-xs" style={{ color: "var(--text-secondary)" }}>
            Your banking activity will show up here.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {transactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              currentUserId={currentUserId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
