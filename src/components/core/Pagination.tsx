import React from "react";

export interface PaginationProps {
	page: number;
	perPage?: number;
	total: number;
	onChange: (page: number) => void;
}

export default function Pagination({ page, perPage = 10, total, onChange }: PaginationProps) {
	const totalPages = Math.max(1, Math.ceil(total / perPage));

	return (
		<div className="flex items-center gap-3">
			<button disabled={page <= 1} onClick={() => onChange(page - 1)} className="px-3 py-1 rounded bg-[var(--bg-input)] border border-[var(--border-primary)]">Prev</button>
			<div className="text-sm" style={{ color: "var(--text-secondary)" }}>{page} / {totalPages}</div>
			<button disabled={page >= totalPages} onClick={() => onChange(page + 1)} className="px-3 py-1 rounded bg-[var(--bg-input)] border border-[var(--border-primary)]">Next</button>
		</div>
	);
}
