export function generateAccountNumber(): string {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 9000 + 1000).toString();
  return `${timestamp}${random}`.slice(0, 10);
}

export function maskAccountNumber(accountNumber: string): string {
  return `****${accountNumber.slice(-4)}`;
}

export function formatAccountNumber(accountNumber: string): string {
  return accountNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");
}
