export interface SpinnerProps {
	size?: number;
	className?: string;
}

export default function Spinner({ size = 16, className = "" }: SpinnerProps) {
	const s = size;
	return (
		<div
			className={"inline-block " + className}
			style={{ width: s, height: s }}
			aria-hidden
		>
			<svg
				viewBox="0 0 50 50"
				className="animate-spin"
				width={s}
				height={s}
				fill="none"
			>
				<circle cx="25" cy="25" r="20" stroke="var(--text-primary)" strokeWidth="5" strokeOpacity="0.15" />
				<path
					d="M45 25a20 20 0 00-36.6-11"
					stroke="var(--text-primary)"
					strokeWidth="5"
					strokeLinecap="round"
				/>
			</svg>
		</div>
	);
}
