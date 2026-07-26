import React from "react";

export type ButtonVariant = "primary" | "ghost" | "danger";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
}

export default function Button({ variant = "primary", className = "", children, ...rest }: ButtonProps) {
	const base = "py-2.5 px-4 rounded-full font-semibold flex items-center justify-center gap-2 text-sm";
	const variantStyle =
		variant === "primary"
			? "bg-[#ccff00] text-[#0d0d0d] shadow-[0_0_20px_rgba(204,255,0,0.25)]"
			: variant === "danger"
			? "bg-red-500 text-white"
			: "bg-transparent border border-var(--border-primary) text-var(--text-primary)";

	return (
		<button className={`${base} ${variantStyle} ${className}`} {...rest}>
			{children}
		</button>
	);
}
