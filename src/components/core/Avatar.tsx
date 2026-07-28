export interface AvatarProps {
  src?: string | null;
  name?: string;
  size?: number;
  className?: string;
}

export default function Avatar({
  src,
  name,
  size = 36,
  className = "",
}: AvatarProps) {
  const initials = name
    ? name
        .split(" ")
        .map((s) => s[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "";

  return (
    <div
      className={`rounded-full overflow-hidden flex items-center justify-center bg-[var(--bg-input)] border border-[var(--border-primary)] ${className}`}
      style={{ width: size, height: size }}
    >
      {src ? (
        <img
          src={src}
          alt={name ?? "avatar"}
          style={{ width: size, height: size }}
        />
      ) : (
        <span
          style={{
            color: "var(--text-primary)",
            fontWeight: 700,
          }}
        >
          {initials}
        </span>
      )}
    </div>
  );
}
