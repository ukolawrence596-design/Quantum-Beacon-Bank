import React from "react";

export interface ToastProps {
	message: React.ReactNode;
	onClose?: () => void;
}

export default function Toast({ message, onClose }: ToastProps) {
	return (
		<div className="fixed bottom-6 right-6 z-50">
			<div className="rounded-xl px-4 py-3 bg-[var(--bg-elevated)] border border-[var(--border-primary)] shadow-[var(--shadow-elevated)]">
				<div className="flex items-center gap-3">
					<div className="flex-1 text-sm" style={{ color: "var(--text-primary)" }}>{message}</div>
					{onClose && (
						<button onClick={onClose} className="text-sm text-[var(--text-muted)]">Close</button>
					)}
				</div>
			</div>
		</div>
	);
}
