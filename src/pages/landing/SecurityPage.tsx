import { Link } from 'react-router-dom'
import {
  Shield, Lock, Smartphone, AlertTriangle,
  ArrowRight, ChevronDown, ChevronUp, Check
} from 'lucide-react'
import { useState } from 'react'

const SECURITY_FEATURES = [
  {
    icon:  Shield,
    title: 'Secure Online Banking Platform',
    desc:  'Our online banking platform is built with multiple layers of security including industry-standard encryption protocols to ensure that your data remains confidential and protected during every transmission.',
  },
  {
    icon:  Smartphone,
    title: 'Multi-Factor Authentication',
    desc:  'To enhance the security of your online banking experience, we employ multi-factor authentication. This additional layer of security requires you to provide multiple pieces of identification to access your account.',
  },
  {
    icon:  AlertTriangle,
    title: 'Fraud Monitoring',
    desc:  'We have sophisticated fraud detection systems in place to monitor your accounts for any suspicious activities. Our dedicated team works around the clock to detect and prevent unauthorized transactions, providing you with peace of mind.',
  },
  {
    icon:  Lock,
    title: 'Secure Mobile Banking',
    desc:  'Our mobile banking app is designed with the same level of security as our online banking platform. You can confidently access your accounts, make transactions and manage your finances on the go, knowing that your information is protected.',
  },
]

const FAQS = [
  {
    q: 'How do I open an account with Quantum Beacon Bank?',
    a: 'Opening an account with Quantum Beacon Bank is easy. Simply visit our website and click the "Open Account" button. Follow the prompts to provide the required information and complete the application process. Our customer support team is available to help if you have any questions.',
  },
  {
    q: 'What documents do I need to provide to apply for a loan?',
    a: 'The documents required for a loan application may vary depending on the type of loan. Generally, you will need a valid ID, proof of income, employment verification and bank statements. Our loan officers will guide you through the specific requirements during the application process.',
  },
  {
    q: 'How can I access my accounts online?',
    a: 'Accessing your accounts online is simple and secure. Visit our website and click "Login". Enter your email and password to access your accounts. If you haven\'t registered for online banking, click "Sign Up" and follow the registration process.',
  },
  {
    q: 'Are my transactions and personal information secure?',
    a: 'At Quantum Beacon Bank, we take the security of your transactions and personal information very seriously. We employ industry-leading encryption and multi-factor authentication to ensure your data is protected. We regularly update our security measures to stay ahead of emerging threats.',
  },
]

export default function SecurityPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  return (
    <main>

      {/* Hero */}
      <section
        className="relative min-h-[60vh] flex items-center overflow-hidden pt-24"
        style={{ background: 'var(--bg-primary)' }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-10 blur-3xl"
            style={{ background: '#ccff00' }}
          />
          <div
            className="absolute top-20 right-20 w-64 h-64 opacity-15"
            style={{
              backgroundImage: 'radial-gradient(circle, #ccff00 1.5px, transparent 1.5px)',
              backgroundSize:  '18px 18px',
              maskImage:       'radial-gradient(ellipse at top right, black 0%, transparent 65%)',
              WebkitMaskImage: 'radial-gradient(ellipse at top right, black 0%, transparent 65%)',
            }}
          />
        </div>

        <div className="container-custom relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold w-fit"
                style={{
                  background: 'rgba(204,255,0,0.1)',
                  color:      '#ccff00',
                  border:     '1px solid rgba(204,255,0,0.3)',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#ccff00' }} />
                Bank-Grade Security
              </div>

              <h1
                className="text-4xl sm:text-5xl font-heading font-black leading-tight"
                style={{ color: 'var(--text-primary)' }}
              >
                Your Security is Our{' '}
                <span style={{ color: '#ccff00' }}>Top Priority</span>
              </h1>

              <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                At Quantum Beacon Bank, we understand the importance of keeping your
                financial information secure. We employ robust security measures and
                advanced technology to protect your personal and financial data. Rest
                assured that when you bank with us, your security is our utmost priority.
              </p>

              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-200 hover:scale-105 w-fit group"
                style={{
                  background: '#ccff00',
                  color:      '#0d0d0d',
                  boxShadow:  '0 0 20px rgba(204,255,0,0.3)',
                }}
              >
                Open Secure Account
                <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Security Visual */}
            <div className="flex justify-center lg:justify-end">
              <div
                className="relative w-72 h-72 rounded-full flex items-center justify-center animate-float"
                style={{
                  background: 'rgba(204,255,0,0.05)',
                  border:     '2px solid rgba(204,255,0,0.15)',
                }}
              >
                <div
                  className="absolute inset-4 rounded-full flex items-center justify-center"
                  style={{
                    background: 'rgba(204,255,0,0.08)',
                    border:     '2px solid rgba(204,255,0,0.2)',
                  }}
                >
                  <div
                    className="w-28 h-28 rounded-full flex items-center justify-center animate-glow-pulse"
                    style={{
                      background: 'rgba(204,255,0,0.1)',
                      border:     '2px solid rgba(204,255,0,0.3)',
                    }}
                  >
                    <Shield size={56} style={{ color: '#ccff00' }} />
                  </div>
                </div>

                {/* Orbiting badges */}
                {[
                  { icon: Lock,        label: '256-bit', angle: 0   },
                  { icon: Smartphone,  label: '2FA',     angle: 120 },
                  { icon: AlertTriangle, label: 'Fraud AI', angle: 240 },
                ].map(({ icon: Icon, label, angle }) => {
                  const rad = (angle * Math.PI) / 180
                  const x   = 50 + 42 * Math.cos(rad)
                  const y   = 50 + 42 * Math.sin(rad)
                  return (
                    <div
                      key={label}
                      className="absolute flex flex-col items-center gap-1"
                      style={{
                        left:      `${x}%`,
                        top:       `${y}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                          background: 'var(--bg-elevated)',
                          border:     '1px solid rgba(204,255,0,0.2)',
                        }}
                      >
                        <Icon size={16} style={{ color: '#ccff00' }} />
                      </div>
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{
                          background: 'rgba(204,255,0,0.1)',
                          color:      '#ccff00',
                        }}
                      >
                        {label}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Protect You */}
      <section
        className="section-padding relative overflow-hidden"
        style={{ background: 'var(--bg-secondary)' }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-10 -left-10 w-96 h-96 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle, #ccff00 1.5px, transparent 1.5px)',
              backgroundSize:  '16px 16px',
              maskImage:       'radial-gradient(ellipse at top left, black 0%, transparent 65%)',
              WebkitMaskImage: 'radial-gradient(ellipse at top left, black 0%, transparent 65%)',
            }}
          />
        </div>

        <div className="container-custom relative z-10">
          <div className="mb-12">
            <h2
              className="text-3xl sm:text-4xl font-heading font-black mb-3"
              style={{ color: 'var(--text-primary)' }}
            >
              How We <span style={{ color: '#ccff00' }}>Protect You</span>
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              At Quantum Beacon Bank, we prioritize the security and confidentiality
              of your financial information. Our state-of-the-art encryption technology
              and stringent data protection measures ensure your assets and transactions
              are safeguarded at all times.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {SECURITY_FEATURES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex items-start gap-5 p-6 rounded-2xl group transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background: `radial-gradient(ellipse at top left, rgba(204,255,0,0.06) 0%, transparent 60%), var(--bg-elevated)`,
                  border:     '1px solid var(--border-primary)',
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{ background: 'rgba(204,255,0,0.1)' }}
                >
                  <Icon size={22} style={{ color: '#ccff00' }} />
                </div>
                <div>
                  <h3
                    className="font-heading font-bold mb-2"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Checklist */}
      <section
        className="section-padding relative overflow-hidden"
        style={{ background: 'var(--bg-primary)' }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-10 -right-10 w-96 h-96 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle, #ccff00 1.5px, transparent 1.5px)',
              backgroundSize:  '16px 16px',
              maskImage:       'radial-gradient(ellipse at top right, black 0%, transparent 65%)',
              WebkitMaskImage: 'radial-gradient(ellipse at top right, black 0%, transparent 65%)',
            }}
          />
        </div>

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6">
              <h2
                className="text-3xl sm:text-4xl font-heading font-black"
                style={{ color: 'var(--text-primary)' }}
              >
                Your Security{' '}
                <span style={{ color: '#ccff00' }}>Checklist</span>
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Follow these best practices to keep your Quantum Beacon Bank account
                as secure as possible at all times.
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  'Use a strong, unique password for your account',
                  'Enable two-factor authentication',
                  'Never share your login credentials with anyone',
                  'Always log out from shared or public devices',
                  'Regularly review your transaction history',
                  'Report suspicious activity immediately',
                  'Keep your contact information up to date',
                  'Use our official app or website only',
                ].map(tip => (
                  <li key={tip} className="flex items-center gap-3">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(204,255,0,0.1)' }}
                    >
                      <Check size={12} style={{ color: '#ccff00' }} />
                    </div>
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      {tip}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="rounded-2xl p-8 flex flex-col gap-6 relative overflow-hidden"
              style={{
                background: `radial-gradient(ellipse at top right, rgba(204,255,0,0.08) 0%, transparent 60%), var(--bg-elevated)`,
                border:     '1px solid rgba(204,255,0,0.15)',
              }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(204,255,0,0.1)' }}
              >
                <Shield size={32} style={{ color: '#ccff00' }} />
              </div>
              <div>
                <h3
                  className="text-2xl font-heading font-black mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Report a Security Issue
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  If you notice any suspicious activity on your account or believe
                  your credentials have been compromised, contact us immediately.
                  Our security team is available 24/7.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <a
                  href="mailto:security@quantumbeaconbank.com"
                  className="flex items-center gap-2 text-sm font-semibold"
                  style={{ color: '#ccff00' }}
                >
                  📧 security@quantumbeaconbank.com
                </a>
                <a
                  href="tel:+15551234567"
                  className="flex items-center gap-2 text-sm font-semibold"
                  style={{ color: '#ccff00' }}
                >
                  📞 +1 (555) 123 4567
                </a>
              </div>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-200 hover:scale-105 w-fit group"
                style={{
                  background: '#ccff00',
                  color:      '#0d0d0d',
                }}
              >
                Open Secure Account
                <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="section-padding relative overflow-hidden"
        style={{ background: 'var(--bg-secondary)' }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-10 -left-10 w-96 h-96 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle, #ccff00 1.5px, transparent 1.5px)',
              backgroundSize:  '16px 16px',
              maskImage:       'radial-gradient(ellipse at top left, black 0%, transparent 65%)',
              WebkitMaskImage: 'radial-gradient(ellipse at top left, black 0%, transparent 65%)',
            }}
          />
        </div>

        <div className="container-custom relative z-10">
          <div className="mb-12">
            <h2
              className="text-3xl sm:text-4xl font-heading font-black mb-3"
              style={{ color: 'var(--text-primary)' }}
            >
              Frequently <span style={{ color: '#ccff00' }}>Asked Questions</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl">
            {FAQS.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl overflow-hidden cursor-pointer transition-all duration-200"
                style={{
                  background: openFAQ === index
                    ? 'rgba(204,255,0,0.05)'
                    : 'var(--bg-elevated)',
                  border: openFAQ === index
                    ? '1px solid rgba(204,255,0,0.15)'
                    : '1px solid var(--border-primary)',
                }}
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              >
                <div className="flex items-start justify-between gap-4 p-5">
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {faq.q}
                  </p>
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      background: openFAQ === index ? '#ccff00' : 'var(--bg-hover)',
                      color:      openFAQ === index ? '#0d0d0d' : 'var(--text-muted)',
                    }}
                  >
                    {openFAQ === index
                      ? <ChevronUp size={12} />
                      : <ChevronDown size={12} />
                    }
                  </div>
                </div>
                {openFAQ === index && (
                  <p
                    className="px-5 pb-5 text-sm leading-relaxed animate-fade-in-up"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}