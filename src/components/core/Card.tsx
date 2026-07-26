import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Card({ children, className = "", ...rest }: CardProps) {
	return (
		<div
			className={`rounded-3xl p-6 bg-[var(--bg-elevated)] border border-[var(--border-primary)] shadow-[var(--shadow-elevated)] ${className}`}
			{...rest}
		>
			{children}
		</div>
	);
}
