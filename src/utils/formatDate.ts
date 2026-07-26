import { format, formatDistanceToNow, isToday, isYesterday } from "date-fns";

export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return format(d, "MMM dd, yyyy");
}

export function formatDateTime(date: string | Date): string {
  const d = new Date(date);
  return format(d, "MMM dd, yyyy • hh:mm a");
}

export function formatRelativeTime(date: string | Date): string {
  const d = new Date(date);
  if (isToday(d)) return `Today, ${format(d, "hh:mm a")}`;
  if (isYesterday(d)) return `Yesterday, ${format(d, "hh:mm a")}`;
  return formatDistanceToNow(d, { addSuffix: true });
}

export function formatMonthYear(date: string | Date): string {
  return format(new Date(date), "MMMM yyyy");
}
