import React from "react";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export default function Select({ className = "", children, ...rest }: SelectProps) {
	return (
		<select className={`w-full py-3 px-4 rounded-full text-sm bg-[var(--bg-input)] border border-[var(--border-primary)] ${className}`} {...rest}>
			{children}
		</select>
	);
}
