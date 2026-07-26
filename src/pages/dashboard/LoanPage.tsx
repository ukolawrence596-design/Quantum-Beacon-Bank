import { useState, useEffect } from 'react'
import {
  Landmark, Clock, CheckCircle, XCircle,
  ChevronRight, Calculator,
  FileText, ArrowRight
} from 'lucide-react'
import { formatCurrency } from '../../utils/formatCurrency'
import { cn } from '../../utils/cn'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { supabase } from '../../services/api'

type LoanType = 'personal' | 'business' | 'education' | 'emergency'
type Step     = 'list' | 'apply' | 'success'

const LOAN_TYPES: { type: LoanType; label: string; desc: string; max: string; rate: string }[] = [
  { type: 'personal',  label: 'Personal Loan',  desc: 'For personal expenses and emergencies', max: '$50,000',  rate: '8.5%'  },
  { type: 'business',  label: 'Business Loan',  desc: 'Grow and expand your business',         max: '$200,000', rate: '7.2%'  },
  { type: 'education', label: 'Education Loan', desc: 'Invest in your future education',        max: '$100,000', rate: '5.9%'  },
  { type: 'emergency', label: 'Emergency Loan', desc: 'Quick funds for urgent needs',           max: '$10,000',  rate: '10.5%' },
]

const STATUS_CONFIG: Record<string, { color: string; bg: string; icon: typeof CheckCircle }> = {
  active:   { color: '#22c55e', bg: 'rgba(34,197,94,0.1)',   icon: CheckCircle  },
  pending:  { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)',  icon: Clock        },
  rejected: { color: '#ef4444', bg: 'rgba(239,68,68,0.1)',   icon: XCircle      },
}

export default function LoanPage() {
  const [step,          setStep]          = useState<Step>('list')
  const [selectedType,  setSelectedType]  = useState<LoanType | null>(null)
  const [loading,       setLoading]       = useState(false)
  const [loanAmount,    setLoanAmount]    = useState('')
  const [loanPeriod,    setLoanPeriod]    = useState('12')
  const [loanPurpose,   setLoanPurpose]   = useState('')
  const [activeLoans,   setActiveLoans]   = useState<any[]>([])

  const monthlyPayment = loanAmount && loanPeriod
    ? ((parseFloat(loanAmount) * 1.085) / parseInt(loanPeriod)).toFixed(2)
    : '0.00'

  const { user } = useAuth()
  const { showSuccess, showError } = useToast()

  useEffect(() => {
    if (!user?.id) return

    supabase
      .from('loans')
      .select('*')
      .eq('user_id', user.id)
      .in('status', ['approved', 'active'])
      .then(({ data }) => setActiveLoans(data || []))
  }, [user?.id])

  const handleApply = async () => {
    if (!user?.id || !selectedType || !loanAmount || !loanPurpose) return
    setLoading(true)
    try {
      const monthly    = parseFloat(monthlyPayment)
      const reference  = `LOAN-${Date.now().toString().slice(-8)}`

      const { error } = await supabase
        .from('loans')
        .insert({
          user_id:        user.id,
          loan_type:      selectedType,
          amount:         parseFloat(loanAmount),
          outstanding:    parseFloat(loanAmount),
          interest_rate:  8.5,
          period_months:  parseInt(loanPeriod),
          monthly_payment: monthly,
          purpose:        loanPurpose,
          status:         'pending',
          reference,
        })

      if (error) throw error

      // Notify customer
      await supabase.from('notifications').insert({
        user_id: user.id,
        title:   'Loan Application Submitted',
        message: `Your ${selectedType} loan application for ${formatCurrency(parseFloat(loanAmount))} has been submitted and is pending review.`,
        type:    'loan',
      })

      setStep('success')
      showSuccess('Loan application submitted successfully!')
    } catch (err: any) {
      showError(err.message || 'Failed to submit loan application')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    background: 'var(--bg-input)',
    border:     '1px solid var(--border-primary)',
    color:      'var(--text-primary)',
    outline:    'none',
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = '#ccff00'
    e.target.style.boxShadow   = '0 0 0 3px rgba(204,255,0,0.1)'
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = 'var(--border-primary)'
    e.target.style.boxShadow   = 'none'
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1
            className="text-2xl font-heading font-black"
            style={{ color: 'var(--text-primary)' }}
          >
            Loans & <span style={{ color: '#ccff00' }}>Financing</span>
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            Manage your loans and apply for new financing
          </p>
        </div>
        {step === 'list' && (
          <button
            onClick={() => setStep('apply')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 hover:scale-105"
            style={{
              background: '#ccff00',
              color:      '#0d0d0d',
              boxShadow:  '0 0 15px rgba(204,255,0,0.3)',
            }}
          >
            <Landmark size={16} />
            Apply for Loan
          </button>
        )}
      </div>

      {/* LIST VIEW */}
      {step === 'list' && (
        <>
          {/* Active Loans */}
          {activeLoans.map(loan => {
            const statusCfg = STATUS_CONFIG[loan.status]
            const StatusIcon = statusCfg.icon
            return (
              <div
                key={loan.id}
                className="rounded-2xl p-6 flex flex-col gap-5 relative overflow-hidden"
                style={{
                  background: `radial-gradient(
                    ellipse at top right,
                    rgba(204,255,0,0.08) 0%,
                    transparent 60%
                  ), var(--bg-elevated)`,
                  border: '1px solid rgba(204,255,0,0.15)',
                }}
              >
                {/* Top Row */}
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: 'rgba(204,255,0,0.1)' }}
                    >
                      <Landmark size={22} style={{ color: '#ccff00' }} />
                    </div>
                    <div>
                      <h3
                        className="font-heading font-bold"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {loan.type}
                      </h3>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        {loan.startDate} — {loan.endDate}
                      </p>
                    </div>
                  </div>
                  <div
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold capitalize"
                    style={{
                      background: statusCfg.bg,
                      color:      statusCfg.color,
                    }}
                  >
                    <StatusIcon size={12} />
                    {loan.status}
                  </div>
                </div>

                {/* Amounts */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      Total Amount
                    </p>
                    <p
                      className="text-lg font-heading font-black mt-0.5"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {formatCurrency(loan.amount)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      Outstanding
                    </p>
                    <p
                      className="text-lg font-heading font-black mt-0.5"
                      style={{ color: '#ef4444' }}
                    >
                      {formatCurrency(loan.balance)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      Monthly Payment
                    </p>
                    <p
                      className="text-lg font-heading font-black mt-0.5"
                      style={{ color: '#ccff00' }}
                    >
                      {formatCurrency(loan.monthly)}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-xs" style={{ color: 'var(--text-muted)' }}>
                    <span>Repayment Progress</span>
                    <span style={{ color: '#ccff00' }}>{loan.progress}%</span>
                  </div>
                  <div
                    className="w-full h-2 rounded-full overflow-hidden"
                    style={{ background: 'var(--bg-hover)' }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width:      `${loan.progress}%`,
                        background: 'linear-gradient(90deg, #ccff00, #a0cc00)',
                      }}
                    />
                  </div>
                </div>

                {/* Next Payment */}
                <div
                  className="flex items-center justify-between px-4 py-3 rounded-xl"
                  style={{
                    background: 'var(--bg-hover)',
                    border:     '1px solid var(--border-primary)',
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Clock size={14} style={{ color: '#f59e0b' }} />
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      Next Payment Due
                    </p>
                  </div>
                  <p
                    className="text-xs font-bold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {loan.nextDate}
                  </p>
                </div>

              </div>
            )
          })}

          {/* Loan Products */}
          <div>
            <h3
              className="font-heading font-bold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Available Loan Products
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {LOAN_TYPES.map(loan => (
                <button
                  key={loan.type}
                  onClick={() => {
                    setSelectedType(loan.type)
                    setStep('apply')
                  }}
                  className="flex items-center justify-between p-5 rounded-2xl text-left transition-all duration-200 hover:scale-[1.02] group"
                  style={{
                    background: 'var(--bg-elevated)',
                    border:     '1px solid var(--border-primary)',
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{ background: 'rgba(204,255,0,0.1)' }}
                    >
                      <Landmark size={18} style={{ color: '#ccff00' }} />
                    </div>
                    <div>
                      <p
                        className="text-sm font-bold"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {loan.label}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                        Up to {loan.max} • {loan.rate} p.a.
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    size={16}
                    style={{ color: 'var(--text-muted)' }}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* APPLY VIEW */}
      {step === 'apply' && (
        <div className="flex flex-col gap-5">

          {/* Loan Type Selector */}
          <div
            className="rounded-2xl p-5 flex flex-col gap-4"
            style={{
              background: 'var(--bg-elevated)',
              border:     '1px solid var(--border-primary)',
            }}
          >
            <h3
              className="font-heading font-bold"
              style={{ color: 'var(--text-primary)' }}
            >
              Select Loan Type
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {LOAN_TYPES.map(loan => (
                <button
                  key={loan.type}
                  onClick={() => setSelectedType(loan.type)}
                  className={cn(
                    'flex flex-col gap-1 p-4 rounded-xl text-left transition-all duration-200'
                  )}
                  style={{
                    background: selectedType === loan.type
                      ? 'rgba(204,255,0,0.08)'
                      : 'var(--bg-hover)',
                    border: selectedType === loan.type
                      ? '1px solid rgba(204,255,0,0.3)'
                      : '1px solid var(--border-primary)',
                  }}
                >
                  <p
                    className="text-sm font-bold"
                    style={{
                      color: selectedType === loan.type
                        ? '#ccff00'
                        : 'var(--text-primary)',
                    }}
                  >
                    {loan.label}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {loan.desc}
                  </p>
                  <p
                    className="text-xs font-semibold mt-1"
                    style={{ color: '#ccff00' }}
                  >
                    Up to {loan.max} • {loan.rate} p.a.
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Loan Details Form */}
          <div
            className="rounded-2xl p-6 flex flex-col gap-5"
            style={{
              background: 'var(--bg-elevated)',
              border:     '1px solid var(--border-primary)',
            }}
          >
            <h3
              className="font-heading font-bold"
              style={{ color: 'var(--text-primary)' }}
            >
              Loan Details
            </h3>

            {/* Amount */}
            <div className="flex flex-col gap-2">
              <label
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: 'var(--text-muted)' }}
              >
                Loan Amount
              </label>
              <div className="relative">
                <span
                  className="absolute left-4 top-1/2 -translate-y-1/2 font-bold"
                  style={{ color: 'var(--text-muted)' }}
                >
                  $
                </span>
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={loanAmount}
                  onChange={e => setLoanAmount(e.target.value)}
                  className="w-full pl-8 pr-4 py-3.5 rounded-full text-sm"
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>

              {/* Quick amounts */}
              <div className="flex gap-2 flex-wrap">
                {['1000', '5000', '10000', '25000', '50000'].map(val => (
                  <button
                    key={val}
                    onClick={() => setLoanAmount(val)}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
                    style={{
                      background: loanAmount === val ? '#ccff00'          : 'var(--bg-hover)',
                      color:      loanAmount === val ? '#0d0d0d'          : 'var(--text-secondary)',
                      border:     '1px solid var(--border-primary)',
                    }}
                  >
                    ${parseInt(val).toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            {/* Repayment Period */}
            <div className="flex flex-col gap-2">
              <label
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: 'var(--text-muted)' }}
              >
                Repayment Period
              </label>
              <select
                value={loanPeriod}
                onChange={e => setLoanPeriod(e.target.value)}
                className="w-full px-4 py-3.5 rounded-full text-sm"
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              >
                <option value="6">6 months</option>
                <option value="12">12 months</option>
                <option value="24">24 months</option>
                <option value="36">36 months</option>
                <option value="48">48 months</option>
                <option value="60">60 months</option>
              </select>
            </div>

            {/* Purpose */}
            <div className="flex flex-col gap-2">
              <label
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: 'var(--text-muted)' }}
              >
                Loan Purpose
              </label>
              <textarea
                placeholder="Briefly describe the purpose of this loan..."
                value={loanPurpose}
                onChange={e => setLoanPurpose(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-2xl text-sm resize-none"
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            {/* Calculator Preview */}
            {loanAmount && (
              <div
                className="rounded-2xl p-5 flex flex-col gap-3 animate-fade-in-up"
                style={{
                  background: 'rgba(204,255,0,0.05)',
                  border:     '1px solid rgba(204,255,0,0.15)',
                }}
              >
                <div className="flex items-center gap-2">
                  <Calculator size={16} style={{ color: '#ccff00' }} />
                  <p
                    className="text-sm font-bold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Loan Summary
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Loan Amount',     value: formatCurrency(parseFloat(loanAmount) || 0) },
                    { label: 'Monthly Payment', value: formatCurrency(parseFloat(monthlyPayment))   },
                    { label: 'Total Repayable', value: formatCurrency(parseFloat(monthlyPayment) * parseInt(loanPeriod)) },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        {label}
                      </p>
                      <p
                        className="text-sm font-bold mt-0.5"
                        style={{ color: '#ccff00' }}
                      >
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Required Documents */}
          <div
            className="rounded-2xl p-5 flex flex-col gap-3"
            style={{
              background: 'rgba(245,158,11,0.05)',
              border:     '1px solid rgba(245,158,11,0.15)',
            }}
          >
            <div className="flex items-center gap-2">
              <FileText size={16} style={{ color: '#f59e0b' }} />
              <p
                className="text-sm font-bold"
                style={{ color: 'var(--text-primary)' }}
              >
                Required Documents
              </p>
            </div>
            <ul className="flex flex-col gap-1.5">
              {[
                'Valid government-issued ID',
                'Proof of income (pay stubs or bank statements)',
                'Employment verification letter',
                'Recent utility bill for address verification',
              ].map(doc => (
                <li
                  key={doc}
                  className="flex items-center gap-2 text-xs"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <span style={{ color: '#f59e0b' }}>•</span>
                  {doc}
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => setStep('list')}
              className="flex-1 py-3.5 rounded-full font-bold text-sm transition-all duration-200 hover:scale-[1.02]"
              style={{
                background: 'transparent',
                color:      'var(--text-secondary)',
                border:     '1px solid var(--border-primary)',
              }}
            >
              ← Back
            </button>
            <button
              onClick={handleApply}
              disabled={loading || !selectedType || !loanAmount || !loanPurpose}
              className="flex-1 py-3.5 rounded-full font-bold text-sm transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 flex items-center justify-center gap-2"
              style={{
                background: '#ccff00',
                color:      '#0d0d0d',
                boxShadow:  '0 0 20px rgba(204,255,0,0.3)',
              }}
            >
              {loading ? (
                <>
                  <div
                    className="w-4 h-4 rounded-full border-2 animate-spin"
                    style={{ borderColor: '#0d0d0d', borderTopColor: 'transparent' }}
                  />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Application
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>

        </div>
      )}

      {/* SUCCESS VIEW */}
      {step === 'success' && (
        <div
          className="rounded-2xl p-10 flex flex-col items-center gap-6 text-center"
          style={{
            background: 'var(--bg-elevated)',
            border:     '1px solid rgba(34,197,94,0.2)',
          }}
        >
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center animate-scale-in"
            style={{
              background: 'rgba(34,197,94,0.1)',
              border:     '2px solid rgba(34,197,94,0.3)',
            }}
          >
            <CheckCircle size={48} style={{ color: '#22c55e' }} />
          </div>
          <div>
            <h2
              className="text-2xl font-heading font-black mb-2"
              style={{ color: '#22c55e' }}
            >
              Application Submitted!
            </h2>
            <p className="text-sm max-w-md" style={{ color: 'var(--text-secondary)' }}>
              Your loan application has been submitted successfully.
              Our team will review it within 24-48 hours and notify you
              of the decision via email.
            </p>
          </div>

          <div
            className="w-full px-5 py-4 rounded-2xl flex items-center justify-between"
            style={{
              background: 'var(--bg-hover)',
              border:     '1px solid var(--border-primary)',
            }}
          >
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Application Reference
            </span>
            <span
              className="text-xs font-bold tracking-wider"
              style={{ color: 'var(--text-primary)' }}
            >
              QBB-LOAN-{Date.now().toString().slice(-6)}
            </span>
          </div>

          <div className="flex gap-3 w-full">
            <button
              onClick={() => {
                setStep('list')
                setSelectedType(null)
                setLoanAmount('')
                setLoanPurpose('')
              }}
              className="flex-1 py-3.5 rounded-full font-bold text-sm transition-all duration-200 hover:scale-[1.02]"
              style={{
                background: 'transparent',
                color:      'var(--text-secondary)',
                border:     '1px solid var(--border-primary)',
              }}
            >
              Back to Loans
            </button>
            <a
              href="/dashboard"
              className="flex-1 py-3.5 rounded-full font-bold text-sm transition-all duration-200 hover:scale-[1.02] flex items-center justify-center"
              style={{
                background: '#ccff00',
                color:      '#0d0d0d',
              }}
            >
              Go to Dashboard
            </a>
          </div>
        </div>
      )}

    </div>
  )
}