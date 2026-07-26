import React from "react";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
	width?: string | number;
	height?: string | number;
}

export default function Skeleton({ width = "100%", height = 12, className = "", ...rest }: SkeletonProps) {
	return (
		<div
			className={`rounded-md bg-gradient-to-r from-[var(--bg-elevated)] to-[var(--bg-input)] animate-pulse ${className}`}
			style={{ width, height }}
			{...rest}
		/>
	);
}
