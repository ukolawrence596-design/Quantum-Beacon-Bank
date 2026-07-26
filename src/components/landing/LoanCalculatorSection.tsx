import { useMemo, useState } from "react";
import { Calculator, Clock, Percent } from "lucide-react";

function calculateMonthlyPayment(amount: number, rate: number, months: number) {
  const monthlyRate = rate / 100 / 12;
  if (monthlyRate === 0) {
    return amount / months;
  }
  return (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
}

export default function LoanCalculatorSection() {
  const [amount, setAmount] = useState("12000");
  const [term, setTerm] = useState("24");
  const [rate, setRate] = useState("8.5");

  const monthlyPayment = useMemo(() => {
    const principal = Number(amount) || 0;
    const interestRate = Number(rate) || 0;
    const months = Number(term) || 1;
    return calculateMonthlyPayment(principal, interestRate, months);
  }, [amount, rate, term]);

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.35em] font-semibold mb-3" style={{ color: "var(--text-muted)" }}>
              Loan calculator
            </p>
            <h2 className="text-3xl sm:text-4xl font-heading font-black mb-4" style={{ color: "var(--text-primary)" }}>
              Estimate your payments instantly
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Use our loan calculator to preview monthly payments, interest rate impact, and total cost before you apply.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-[var(--border-primary)] bg-[var(--bg-elevated)] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: "rgba(204,255,0,0.12)", color: "#ccff00" }}>
                    <Calculator size={20} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] font-semibold" style={{ color: "var(--text-muted)" }}>
                      Loan amount
                    </p>
                    <p className="mt-2 text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
                      ${Number(amount).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="block text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: "var(--text-muted)" }}>
                    Amount
                    <input
                      type="number"
                      value={amount}
                      onChange={(event) => setAmount(event.target.value)}
                      className="mt-2 w-full rounded-3xl border border-[var(--border-primary)] bg-[var(--bg-input)] px-4 py-3 text-sm"
                      style={{ color: "var(--text-primary)" }}
                    />
                  </label>
                </div>
              </div>

              <div className="rounded-3xl border border-[var(--border-primary)] bg-[var(--bg-elevated)] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: "rgba(204,255,0,0.12)", color: "#ccff00" }}>
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] font-semibold" style={{ color: "var(--text-muted)" }}>
                      Term
                    </p>
                    <p className="mt-2 text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
                      {term} months
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="block text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: "var(--text-muted)" }}>
                    Term length
                    <select
                      value={term}
                      onChange={(event) => setTerm(event.target.value)}
                      className="mt-2 w-full rounded-3xl border border-[var(--border-primary)] bg-[var(--bg-input)] px-4 py-3 text-sm"
                      style={{ color: "var(--text-primary)" }}
                    >
                      <option value="12">12 months</option>
                      <option value="24">24 months</option>
                      <option value="36">36 months</option>
                      <option value="48">48 months</option>
                      <option value="60">60 months</option>
                    </select>
                  </label>
                </div>
              </div>

              <div className="rounded-3xl border border-[var(--border-primary)] bg-[var(--bg-elevated)] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: "rgba(204,255,0,0.12)", color: "#ccff00" }}>
                    <Percent size={20} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] font-semibold" style={{ color: "var(--text-muted)" }}>
                      Interest rate
                    </p>
                    <p className="mt-2 text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
                      {rate}%
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="block text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: "var(--text-muted)" }}>
                    Annual rate
                    <input
                      type="number"
                      value={rate}
                      onChange={(event) => setRate(event.target.value)}
                      className="mt-2 w-full rounded-3xl border border-[var(--border-primary)] bg-[var(--bg-input)] px-4 py-3 text-sm"
                      style={{ color: "var(--text-primary)" }}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[var(--border-primary)] bg-[var(--bg-elevated)] p-8 shadow-lg">
            <div className="mb-6 flex items-center gap-4">
              <div className="w-14 h-14 rounded-3xl flex items-center justify-center" style={{ background: "rgba(204,255,0,0.12)", color: "#ccff00" }}>
                <Calculator size={24} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.35em] font-semibold" style={{ color: "var(--text-muted)" }}>
                  Monthly payment
                </p>
                <p className="text-3xl font-heading font-black" style={{ color: "var(--text-primary)" }}>
                  ${monthlyPayment ? monthlyPayment.toFixed(2) : "0.00"}
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              This estimate gives you a quick preview of the monthly amount based on your loan size, term and rate.
            </p>
            <div className="mt-8 grid gap-4 rounded-3xl bg-[var(--bg-primary)] p-6" style={{ border: "1px solid rgba(204,255,0,0.16)" }}>
              <div className="flex items-center justify-between text-sm" style={{ color: "var(--text-secondary)" }}>
                <span>Total loan</span>
                <span className="font-semibold" style={{ color: "var(--text-primary)" }}>${Number(amount).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm" style={{ color: "var(--text-secondary)" }}>
                <span>Loan term</span>
                <span className="font-semibold" style={{ color: "var(--text-primary)" }}>{term} months</span>
              </div>
              <div className="flex items-center justify-between text-sm" style={{ color: "var(--text-secondary)" }}>
                <span>Estimated rate</span>
                <span className="font-semibold" style={{ color: "var(--text-primary)" }}>{rate}% APR</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
