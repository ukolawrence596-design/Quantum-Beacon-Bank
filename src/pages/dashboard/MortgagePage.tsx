import { useState } from 'react'
import {
  Home, Calculator, FileText, CheckCircle,
  ArrowRight, Clock, DollarSign, Percent
} from 'lucide-react'
import { formatCurrency } from '../../utils/formatCurrency'

type Step = 'info' | 'apply' | 'success'

const MORTGAGE_TYPES = [
  {
    type:  'fixed',
    label: 'Fixed Rate',
    desc:  'Stable monthly payments for the life of the loan',
    rate:  '6.5%',
    term:  '15-30 years',
  },
  {
    type:  'adjustable',
    label: 'Adjustable Rate',
    desc:  'Lower initial rate that adjusts periodically',
    rate:  '5.2%',
    term:  '5/1, 7/1, 10/1 ARM',
  },
  {
    type:  'fha',
    label: 'FHA Loan',
    desc:  'Government-backed loan with low down payment',
    rate:  '6.8%',
    term:  '15-30 years',
  },
]

const PROCESS_STEPS = [
  { step: '01', title: 'Pre-Qualification',    desc: 'Get an estimate of how much you can borrow'     },
  { step: '02', title: 'Application',          desc: 'Submit your full mortgage application'           },
  { step: '03', title: 'Processing',           desc: 'We verify your information and documents'       },
  { step: '04', title: 'Underwriting',         desc: 'Final review and approval decision'              },
  { step: '05', title: 'Closing',              desc: 'Sign documents and receive your funds'           },
]

export default function MortgagePage() {
  const [step,           setStep]           = useState<Step>('info')
  const [selectedType,   setSelectedType]   = useState('fixed')
  const [loading,        setLoading]        = useState(false)
  const [propertyValue,  setPropertyValue]  = useState('')
  const [downPayment,    setDownPayment]    = useState('')
  const [loanTerm,       setLoanTerm]       = useState('30')
  const [annualIncome,   setAnnualIncome]   = useState('')

  const loanAmount     = parseFloat(propertyValue || '0') - parseFloat(downPayment || '0')
  const monthlyPayment = loanAmount > 0
    ? ((loanAmount * (0.065 / 12)) / (1 - Math.pow(1 + 0.065 / 12, -parseInt(loanTerm) * 12))).toFixed(2)
    : '0.00'

  const downPaymentPercent = propertyValue && downPayment
    ? ((parseFloat(downPayment) / parseFloat(propertyValue)) * 100).toFixed(1)
    : '0'

  const handleApply = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep('success')
    }, 2000)
  }

  const inputStyle = {
    background: 'var(--bg-input)',
    border:     '1px solid var(--border-primary)',
    color:      'var(--text-primary)',
    outline:    'none',
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.target.style.borderColor = '#ccff00'
    e.target.style.boxShadow   = '0 0 0 3px rgba(204,255,0,0.1)'
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
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
            Mortgage <span style={{ color: '#ccff00' }}>Services</span>
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            Your path to homeownership starts here
          </p>
        </div>
        {step === 'info' && (
          <button
            onClick={() => setStep('apply')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 hover:scale-105"
            style={{
              background: '#ccff00',
              color:      '#0d0d0d',
              boxShadow:  '0 0 15px rgba(204,255,0,0.3)',
            }}
          >
            <Home size={16} />
            Apply Now
          </button>
        )}
      </div>

      {/* INFO VIEW */}
      {step === 'info' && (
        <>

          {/* Hero Banner */}
          <div
            className="rounded-2xl p-8 relative overflow-hidden"
            style={{
              background: `radial-gradient(
                ellipse at top right,
                rgba(204,255,0,0.12) 0%,
                transparent 60%
              ), var(--bg-elevated)`,
              border: '1px solid rgba(204,255,0,0.15)',
            }}
          >
            <div
              className="absolute top-0 right-0 w-48 h-48 opacity-10"
              style={{
                backgroundImage: 'radial-gradient(circle, #ccff00 1.5px, transparent 1.5px)',
                backgroundSize:  '16px 16px',
                maskImage:       'radial-gradient(ellipse at top right, black 0%, transparent 65%)',
                WebkitMaskImage: 'radial-gradient(ellipse at top right, black 0%, transparent 65%)',
              }}
            />
            <div className="relative z-10 flex flex-col gap-4 max-w-lg">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(204,255,0,0.1)' }}
              >
                <Home size={28} style={{ color: '#ccff00' }} />
              </div>
              <h2
                className="text-2xl font-heading font-black"
                style={{ color: 'var(--text-primary)' }}
              >
                Make Your Dream Home{' '}
                <span style={{ color: '#ccff00' }}>A Reality</span>
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Quantum Beacon Bank offers competitive mortgage rates and flexible
                terms to help you purchase your dream home. Our experienced mortgage
                specialists will guide you every step of the way.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Percent,     label: 'Rates from 5.2%' },
                  { icon: Clock,       label: 'Fast Approval'   },
                  { icon: DollarSign,  label: 'Low Down Payment'},
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium"
                    style={{
                      background: 'rgba(204,255,0,0.08)',
                      color:      '#ccff00',
                      border:     '1px solid rgba(204,255,0,0.15)',
                    }}
                  >
                    <Icon size={12} />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mortgage Types */}
          <div>
            <h3
              className="font-heading font-bold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Mortgage Products
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {MORTGAGE_TYPES.map(m => (
                <div
                  key={m.type}
                  className="rounded-2xl p-5 flex flex-col gap-3 transition-all duration-200 hover:scale-[1.02] cursor-pointer group"
                  style={{
                    background: 'var(--bg-elevated)',
                    border:     '1px solid var(--border-primary)',
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ background: 'rgba(204,255,0,0.1)' }}
                  >
                    <Home size={18} style={{ color: '#ccff00' }} />
                  </div>
                  <div>
                    <p
                      className="text-sm font-bold"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {m.label}
                    </p>
                    <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                      {m.desc}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-2"
                    style={{ borderTop: '1px solid var(--border-primary)' }}
                  >
                    <span
                      className="text-lg font-heading font-black"
                      style={{ color: '#ccff00' }}
                    >
                      {m.rate}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {m.term}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Process Steps */}
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
              How It Works
            </h3>
            <div className="flex flex-col gap-4">
              {PROCESS_STEPS.map((s, i) => (
                <div key={s.step} className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm shrink-0"
                    style={{
                      background: '#ccff00',
                      color:      '#0d0d0d',
                    }}
                  >
                    {s.step}
                  </div>
                  <div className="flex-1 pt-1">
                    <p
                      className="text-sm font-bold"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {s.title}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      {s.desc}
                    </p>
                  </div>
                  {i < PROCESS_STEPS.length - 1 && (
                    <div
                      className="absolute left-5 mt-10 w-px h-8"
                      style={{ background: 'var(--border-primary)' }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

        </>
      )}

      {/* APPLY VIEW */}
      {step === 'apply' && (
        <div className="flex flex-col gap-5">

          {/* Mortgage Type */}
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
              Select Mortgage Type
            </h3>
            <div className="grid sm:grid-cols-3 gap-3">
              {MORTGAGE_TYPES.map(m => (
                <button
                  key={m.type}
                  onClick={() => setSelectedType(m.type)}
                  className="flex flex-col gap-1 p-4 rounded-xl text-left transition-all duration-200"
                  style={{
                    background: selectedType === m.type
                      ? 'rgba(204,255,0,0.08)'
                      : 'var(--bg-hover)',
                    border: selectedType === m.type
                      ? '1px solid rgba(204,255,0,0.3)'
                      : '1px solid var(--border-primary)',
                  }}
                >
                  <p
                    className="text-sm font-bold"
                    style={{
                      color: selectedType === m.type
                        ? '#ccff00'
                        : 'var(--text-primary)',
                    }}
                  >
                    {m.label}
                  </p>
                  <p
                    className="text-sm font-black"
                    style={{ color: '#ccff00' }}
                  >
                    {m.rate}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Property Details */}
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
              Property & Financial Details
            </h3>

            <div className="grid sm:grid-cols-2 gap-5">

              {[
                { label: 'Property Value',  state: propertyValue,  setter: setPropertyValue,  placeholder: 'e.g. 350000' },
                { label: 'Down Payment',    state: downPayment,    setter: setDownPayment,    placeholder: 'e.g. 70000'  },
                { label: 'Annual Income',   state: annualIncome,   setter: setAnnualIncome,   placeholder: 'e.g. 80000'  },
              ].map(({ label, state, setter, placeholder }) => (
                <div key={label} className="flex flex-col gap-2">
                  <label
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {label}
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
                      placeholder={placeholder}
                      value={state}
                      onChange={e => setter(e.target.value)}
                      className="w-full pl-8 pr-4 py-3.5 rounded-full text-sm"
                      style={inputStyle}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>
              ))}

              {/* Loan Term */}
              <div className="flex flex-col gap-2">
                <label
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Loan Term
                </label>
                <select
                  value={loanTerm}
                  onChange={e => setLoanTerm(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-full text-sm"
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                >
                  <option value="10">10 years</option>
                  <option value="15">15 years</option>
                  <option value="20">20 years</option>
                  <option value="25">25 years</option>
                  <option value="30">30 years</option>
                </select>
              </div>

            </div>

            {/* Mortgage Calculator Preview */}
            {propertyValue && downPayment && (
              <div
                className="rounded-2xl p-5 flex flex-col gap-4 animate-fade-in-up"
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
                    Mortgage Summary
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: 'Property Value',    value: formatCurrency(parseFloat(propertyValue) || 0) },
                    { label: 'Down Payment',      value: `${formatCurrency(parseFloat(downPayment) || 0)} (${downPaymentPercent}%)` },
                    { label: 'Loan Amount',       value: formatCurrency(Math.max(loanAmount, 0)) },
                    { label: 'Monthly Payment',   value: formatCurrency(parseFloat(monthlyPayment)) },
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
                'Last 2 years tax returns',
                'Last 3 months pay stubs',
                'Last 3 months bank statements',
                'Property appraisal report',
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

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => setStep('info')}
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
              disabled={loading || !propertyValue || !downPayment || !annualIncome}
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
              Your mortgage application has been successfully submitted.
              A mortgage specialist will contact you within 2-3 business
              days to discuss next steps.
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
              QBB-MORT-{Date.now().toString().slice(-6)}
            </span>
          </div>

          <div className="flex gap-3 w-full">
            <button
              onClick={() => setStep('info')}
              className="flex-1 py-3.5 rounded-full font-bold text-sm transition-all duration-200 hover:scale-[1.02]"
              style={{
                background: 'transparent',
                color:      'var(--text-secondary)',
                border:     '1px solid var(--border-primary)',
              }}
            >
              Back to Mortgage
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