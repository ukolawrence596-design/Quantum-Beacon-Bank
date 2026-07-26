import React from "react";

export type AlertVariant = "info" | "success" | "error" | "warning";

export interface AlertProps {
	children?: React.ReactNode;
	variant?: AlertVariant;
	onClose?: () => void;
}

export default function Alert({ children, variant = "info", onClose }: AlertProps) {
	const bg = variant === "success" ? "rgba(34,197,94,0.06)" : variant === "error" ? "rgba(239,68,68,0.06)" : variant === "warning" ? "rgba(245,158,11,0.06)" : "rgba(59,130,246,0.06)";
	const border = variant === "success" ? "rgba(34,197,94,0.2)" : variant === "error" ? "rgba(239,68,68,0.2)" : variant === "warning" ? "rgba(245,158,11,0.2)" : "rgba(59,130,246,0.2)";

	return (
		<div style={{ background: bg, border: `1px solid ${border}` }} className="rounded-xl p-3 text-sm text-[var(--text-primary)]">
			<div className="flex items-start justify-between gap-4">
				<div className="flex-1">{children}</div>
				{onClose && (
					<button onClick={onClose} className="text-[var(--text-muted)]">Close</button>
				)}
			</div>
		</div>
	);
}
