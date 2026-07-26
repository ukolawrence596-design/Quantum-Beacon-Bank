export type TransactionStatus =
  | "processing"
  | "successful"
  | "failed"
  | "cancelled";
export type TransactionType =
  | "transfer"
  | "receive"
  | "topup"
  | "loan"
  | "repayment";

export function getStatusColor(status: TransactionStatus): string {
  const colors = {
    processing: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
    successful: "text-green-400 bg-green-400/10 border-green-400/20",
    failed: "text-red-400 bg-red-400/10 border-red-400/20",
    cancelled: "text-gray-400 bg-gray-400/10 border-gray-400/20",
  };
  return colors[status];
}

export function getStatusLabel(status: TransactionStatus): string {
  const labels = {
    processing: "Processing",
    successful: "Successful",
    failed: "Failed",
    cancelled: "Cancelled",
  };
  return labels[status];
}

export function getTransactionSign(type: TransactionType): string {
  const debit = ["transfer", "repayment"];
  return debit.includes(type) ? "-" : "+";
}

export function getTransactionColor(type: TransactionType): string {
  const debit = ["transfer", "repayment"];
  return debit.includes(type) ? "text-red-400" : "text-primary-400";
}
