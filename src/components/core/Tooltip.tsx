import React from "react";

export interface TooltipProps {
	content: React.ReactNode;
	children: React.ReactNode;
}

export default function Tooltip({ content, children }: TooltipProps) {
	return (
		<span className="relative group inline-flex">
			{children}
			<span className="absolute left-1/2 -translate-x-1/2 -top-8 scale-0 group-hover:scale-100 transition-transform bg-[var(--bg-elevated)] border border-[var(--border-primary)] rounded-md px-2 py-1 text-xs" style={{ whiteSpace: "nowrap" }}>
				{content}
			</span>
		</span>
	);
}
