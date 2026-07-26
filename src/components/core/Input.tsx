import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	icon?: React.ReactNode;
}

export default function Input({ icon, className = "", ...rest }: InputProps) {
	return (
		<div className={`relative ${className}`}>
			{icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">{icon}</div>}
			<input
				className={`w-full pl-${icon ? "11" : "4"} pr-4 py-3.5 rounded-full text-sm`} 
				style={{ background: "var(--bg-input)", border: "1px solid var(--border-primary)", color: "var(--text-primary)" }}
				{...rest}
			/>
		</div>
	);
}
