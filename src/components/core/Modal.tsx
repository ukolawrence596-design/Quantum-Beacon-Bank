import React from "react";

export interface ModalProps {
	open: boolean;
	onClose?: () => void;
	title?: React.ReactNode;
	children?: React.ReactNode;
}

export default function Modal({ open, onClose, title, children }: ModalProps) {
	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div className="absolute inset-0 bg-black/40" onClick={onClose} />
			<div className="relative z-10 w-full max-w-lg rounded-2xl p-6 bg-[var(--bg-elevated)] border border-[var(--border-primary)]">
				{title && <div className="text-lg font-bold mb-4">{title}</div>}
				<div>{children}</div>
			</div>
		</div>
	);
}
