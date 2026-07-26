import React from "react";

export interface DrawerProps {
	open: boolean;
	onClose?: () => void;
	children?: React.ReactNode;
	side?: "left" | "right";
}

export default function Drawer({ open, onClose, children, side = "right" }: DrawerProps) {
	return (
		<div aria-hidden={!open} className={`fixed inset-0 z-50 transition-transform ${open ? "" : "pointer-events-none"}`}>
			<div
				className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
				onClick={onClose}
			/>
			<div
				className={`absolute top-0 ${side === "right" ? "right-0" : "left-0"} h-full w-full max-w-md bg-[var(--bg-elevated)] border-l border-[var(--border-primary)] p-6 transition-transform`} 
				style={{ transform: open ? "translateX(0)" : side === "right" ? "translateX(100%)" : "translateX(-100%)" }}
			>
				{children}
			</div>
		</div>
	);
}
