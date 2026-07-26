export interface PasswordStrengthMeterProps {
  password: string;
}

const PASSWORD_CHECKS = [
  { label: "At least 8 characters", test: (password: string) => password.length >= 8 },
  { label: "One uppercase letter", test: (password: string) => /[A-Z]/.test(password) },
  { label: "One lowercase letter", test: (password: string) => /[a-z]/.test(password) },
  { label: "One number", test: (password: string) => /[0-9]/.test(password) },
  { label: "One special character", test: (password: string) => /[^A-Za-z0-9]/.test(password) },
];

export default function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  if (!password) return null;

  return (
    <div className="rounded-2xl p-4 flex flex-col gap-2" style={{ background: "var(--bg-input)", border: "1px solid var(--border-primary)" }}>
      {PASSWORD_CHECKS.map((check) => {
        const passed = check.test(password);
        return (
          <div key={check.label} className="flex items-center gap-2 text-xs">
            <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-all duration-200" style={{ background: passed ? "#ccff00" : "var(--bg-elevated)", border: passed ? "none" : "1px solid var(--border-secondary)" }}>
              {passed && <span style={{ color: "#0d0d0d", fontWeight: 700 }}>✓</span>}
            </div>
            <span style={{ color: passed ? "var(--text-primary)" : "var(--text-muted)" }}>{check.label}</span>
          </div>
        );
      })}
    </div>
  );
}
