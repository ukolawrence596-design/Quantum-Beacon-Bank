import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/auth.service";
import RegisterForm from "../../components/auth/RegisterForm";

const PASSWORD_CHECKS = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One lowercase letter", test: (p: string) => /[a-z]/.test(p) },
  { label: "One number", test: (p: string) => /[0-9]/.test(p) },
  { label: "One special character", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep1 = () => {
    if (!form.firstName || !form.lastName || !form.email || !form.phone) {
      setError("Please complete all fields in step 1.");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!form.password || !form.confirmPassword) {
      setError("Please provide your password and confirm it.");
      return false;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    if (!PASSWORD_CHECKS.every((check) => check.test(form.password))) {
      setError("Please satisfy all password requirements.");
      return false;
    }
    if (!agreed) {
      setError("You must agree to the terms before registering.");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    setError("");
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handleRegister = async () => {
    setError("");
    if (!validateStep2()) return;
    setLoading(true);

    try {
      await registerUser({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });
      navigate("/otp-verification", { state: { email: form.email } });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Registration failed";
      setError(message.includes("already registered") ? "An account with this email already exists" : message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] py-16">
      <div className="w-full max-w-3xl rounded-[2rem] border border-[var(--border-primary)] bg-[var(--bg-elevated)] p-8 shadow-2xl">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-heading font-black" style={{ color: "var(--text-primary)" }}>
            Create your account
          </h1>
          <p className="mt-3 text-sm text-[var(--text-secondary)]">
            Register now to start banking with Quantum Beacon.
          </p>
        </div>

        <RegisterForm
          step={step}
          loading={loading}
          error={error}
          agreed={agreed}
          values={form}
          onFieldChange={(field, value) => update(field, value)}
          onNext={handleNext}
          onBack={() => {
            setError("");
            setStep(1);
          }}
          onToggleAgreement={() => setAgreed((prev) => !prev)}
          onSubmit={handleRegister}
        />

        <div className="mt-8 text-center text-sm" style={{ color: "var(--text-secondary)" }}>
          Already have an account?{' '}
          <Link to="/login" className="text-[#ccff00] underline">
            Log in
          </Link>
        </div>
      </div>
    </main>
  );
}
