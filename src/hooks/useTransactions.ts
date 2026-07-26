import { useEffect, useState } from "react";
import { getUserTransactions } from "../services/transaction.service";

interface TransactionRecord {
  id: string;
  sender_id: string | null;
  receiver_id: string | null;
  sender_account: string;
  receiver_account: string;
  amount: number;
  type: string;
  status: string;
  note: string;
  reference: string;
  created_at: string;
}

export default function useTransactions(userId: string, limit = 50) {
  const [transactions, setTransactions] = useState<TransactionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setTransactions([]);
      setLoading(false);
      return;
    }

    let active = true;
    setLoading(true);
    setError(null);

    getUserTransactions(userId, limit)
      .then((data) => {
        if (!active) return;
        setTransactions(data || []);
      })
      .catch((err) => {
        if (!active) return;
        setError(err?.message || "Unable to load transactions.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [userId, limit]);

  return {
    transactions,
    loading,
    error,
    refresh: () => {
      setLoading(true);
      setError(null);
      getUserTransactions(userId, limit)
        .then((data) => setTransactions(data || []))
        .catch((err) => setError(err?.message || "Unable to load transactions."))
        .finally(() => setLoading(false));
    },
  };
}
