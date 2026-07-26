import { useMemo, useState } from "react";
import { ArrowRight, Check, Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react";
import { Link } from "react-router-dom";

export interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterFormProps {
  step?: number;
  loading?: boolean;
  error?: string;
  onNext?: () => void;
  onSubmit?: (values: RegisterFormValues) => Promise<void> | void;
  onBack?: () => void;
  agreed?: boolean;
  onToggleAgreement?: () => void;
  onFieldChange?: (field: keyof RegisterFormValues, value: string) => void;
  values?: RegisterFormValues;
}

const PASSWORD_CHECKS = [
  { label: "At least 8 characters", test: (password: string) => password.length >= 8 },
  { label: "One uppercase letter", test: (password: string) => /[A-Z]/.test(password) },
  { label: "One lowercase letter", test: (password: string) => /[a-z]/.test(password) },
  { label: "One number", test: (password: string) => /[0-9]/.test(password) },
  { label: "One special character", test: (password: string) => /[^A-Za-z0-9]/.test(password) },
];

export default function RegisterForm({
  step = 1,
  loading = false,
  error = "",
  onNext,
  onSubmit,
  onBack,
  agreed = false,
  onToggleAgreement,
  onFieldChange,
  values,
}: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const formValues = useMemo(() => values ?? {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  }, [values]);

  const inputStyle = {
    background: "var(--bg-input)",
    border: "1px solid var(--border-primary)",
    color: "var(--text-primary)",
    outline: "none",
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.style.borderColor = "#ccff00";
    event.target.style.boxShadow = "0 0 0 3px rgba(204,255,0,0.1)";
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.style.borderColor = "var(--border-primary)";
    event.target.style.boxShadow = "none";
  };

  return (
    <div className="rounded-3xl p-8 sm:p-10" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-primary)", boxShadow: "var(--shadow-elevated)" }}>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-heading font-black mb-2" style={{ color: "#ccff00" }}>
          {step === 1 ? "Create Account" : "Set Password"}
        </h1>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          {step === 1 ? "Start your financial journey with us today" : "Choose a strong password to secure your account"}
        </p>
      </div>

      {error && (
        <div className="mb-6 px-4 py-3 rounded-xl text-sm text-center" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444" }}>
          {error}
        </div>
      )}

      {step === 1 && (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }}>
                <User size={15} />
              </div>
              <input type="text" placeholder="First Name" value={formValues.firstName} onChange={(event) => onFieldChange?.("firstName", event.target.value)} className="w-full pl-10 pr-4 py-3.5 rounded-full text-sm" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
            </div>
            <div className="relative">
              <input type="text" placeholder="Last Name" value={formValues.lastName} onChange={(event) => onFieldChange?.("lastName", event.target.value)} className="w-full px-4 py-3.5 rounded-full text-sm" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }}>
              <Mail size={15} />
            </div>
            <input type="email" placeholder="Email Address" value={formValues.email} onChange={(event) => onFieldChange?.("email", event.target.value)} className="w-full pl-11 pr-4 py-3.5 rounded-full text-sm" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
          </div>

          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }}>
              <Phone size={15} />
            </div>
            <input type="tel" placeholder="Phone Number" value={formValues.phone} onChange={(event) => onFieldChange?.("phone", event.target.value)} className="w-full pl-11 pr-4 py-3.5 rounded-full text-sm" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
          </div>

          <button type="button" onClick={onNext} className="w-full py-3.5 rounded-full font-bold text-sm transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2 mt-2" style={{ background: "#ccff00", color: "#0d0d0d", boxShadow: "0 0 20px rgba(204,255,0,0.3)" }}>
            Continue
            <ArrowRight size={16} />
          </button>
        </div>
      )}

      {step === 2 && (
        <form onSubmit={(event) => { event.preventDefault(); void onSubmit?.(formValues); }} className="flex flex-col gap-4">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }}>
              <Lock size={15} />
            </div>
            <input type={showPassword ? "text" : "password"} placeholder="Create Password" value={formValues.password} onChange={(event) => onFieldChange?.("password", event.target.value)} className="w-full pl-11 pr-12 py-3.5 rounded-full text-sm" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
            <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }}>
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>

          {formValues.password.length > 0 && (
            <div className="rounded-2xl p-4 flex flex-col gap-2" style={{ background: "var(--bg-input)", border: "1px solid var(--border-primary)" }}>
              {PASSWORD_CHECKS.map((check) => {
                const passed = check.test(formValues.password);
                return (
                  <div key={check.label} className="flex items-center gap-2 text-xs">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-all duration-200" style={{ background: passed ? "#ccff00" : "var(--bg-elevated)", border: passed ? "none" : "1px solid var(--border-secondary)" }}>
                      {passed && <Check size={10} color="#0d0d0d" strokeWidth={3} />}
                    </div>
                    <span style={{ color: passed ? "var(--text-primary)" : "var(--text-muted)" }}>{check.label}</span>
                  </div>
                );
              })}
            </div>
          )}

          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }}>
              <Lock size={15} />
            </div>
            <input type={showConfirm ? "text" : "password"} placeholder="Confirm Password" value={formValues.confirmPassword} onChange={(event) => onFieldChange?.("confirmPassword", event.target.value)} className="w-full pl-11 pr-12 py-3.5 rounded-full text-sm" style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
            <button type="button" onClick={() => setShowConfirm((prev) => !prev)} className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }}>
              {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>

          {formValues.confirmPassword.length > 0 && (
            <p className="text-xs flex items-center gap-1" style={{ color: formValues.password === formValues.confirmPassword ? "#22c55e" : "#ef4444" }}>
              {formValues.password === formValues.confirmPassword ? "✓ Passwords match" : "✗ Passwords do not match"}
            </p>
          )}

          <div className="flex items-start gap-3">
            <button type="button" onClick={onToggleAgreement} className="w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 transition-all duration-200" style={{ background: agreed ? "#ccff00" : "var(--bg-input)", border: agreed ? "none" : "1px solid var(--border-primary)" }}>
              {agreed && <Check size={12} color="#0d0d0d" strokeWidth={3} />}
            </button>
            <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              I agree to the <Link to="#" className="underline" style={{ color: "#ccff00" }}>Terms of Service</Link> and <Link to="#" className="underline" style={{ color: "#ccff00" }}>Privacy Policy</Link>
            </p>
          </div>

          <button type="submit" disabled={loading} className="w-full py-3.5 rounded-full font-bold text-sm transition-all duration-200 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2" style={{ background: "#ccff00", color: "#0d0d0d", boxShadow: "0 0 20px rgba(204,255,0,0.3)" }}>
            {loading ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 animate-spin" style={{ borderColor: "#0d0d0d", borderTopColor: "transparent" }} />
                Creating Account...
              </>
            ) : (
              <>
                Create Account
                <ArrowRight size={16} />
              </>
            )}
          </button>

          <button type="button" onClick={onBack} className="w-full py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-[1.02]" style={{ background: "transparent", color: "var(--text-secondary)", border: "1px solid var(--border-primary)" }}>
            ← Back
          </button>
        </form>
      )}
    </div>
  );
}
