import React from "react";

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {}

export default function Table({ children, className = "", ...rest }: TableProps) {
	return (
		<div className={`overflow-x-auto ${className}`}>
			<table className="min-w-full text-sm" {...rest}>
				{children}
			</table>
		</div>
	);
}
