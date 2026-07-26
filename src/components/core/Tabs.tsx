import React from "react";

export interface TabsProps {
	tabs: { id: string; label: React.ReactNode }[];
	active: string;
	onChange: (id: string) => void;
}

export default function Tabs({ tabs, active, onChange }: TabsProps) {
	return (
		<div className="flex items-center gap-2">
			{tabs.map((t) => (
				<button key={t.id} onClick={() => onChange(t.id)} className={`px-3 py-2 rounded-full text-sm ${active === t.id ? "bg-[#ccff00] text-[#0d0d0d]" : "bg-[var(--bg-input)] text-[var(--text-primary)]"}`}>
					{t.label}
				</button>
			))}
		</div>
	);
}
