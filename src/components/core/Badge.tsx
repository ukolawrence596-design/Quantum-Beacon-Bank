import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
	children?: React.ReactNode;
}

export default function Badge({ children, className = "", ...rest }: BadgeProps) {
	return (
		<span className={`inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold ${className}`} {...rest}>
			{children}
		</span>
	);
}
