import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const logoSrc = `${import.meta.env.BASE_URL}logo.png`

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: 'var(--bg-secondary)',
        borderTop:  '1px solid var(--border-primary)',
      }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -bottom-10 -right-10 w-72 h-72 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, #ccff00 1.5px, transparent 1.5px)',
            backgroundSize:  '16px 16px',
            maskImage:       'radial-gradient(ellipse at bottom right, black 0%, transparent 65%)',
            WebkitMaskImage: 'radial-gradient(ellipse at bottom right, black 0%, transparent 65%)',
          }}
        />
      </div>

      <div className="container-custom relative z-10">

        {/* Main Footer Grid */}
        <div className="py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Column 1 — Brand */}
          <div className="flex flex-col gap-5">

            <Link to="/" className="flex items-center gap-2 group w-fit">
              <div
                className="w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{
                  background: 'var(--bg-elevated)',
                  border:     '1px solid var(--border-primary)',
                }}
              >
                <img
                  src={logoSrc}
                  alt="Quantum Beacon Bank logo"
                  className="w-7 h-7 object-contain"
                />
              </div>
              <span
                className="font-heading font-bold text-base"
                style={{ color: 'var(--text-primary)' }}
              >
                Quantum{' '}
                <span style={{ color: '#ccff00' }}>Beacon</span>{' '}
                Bank
              </span>
            </Link>

            <p
              className="text-sm leading-relaxed max-w-xs"
              style={{ color: 'var(--text-secondary)' }}
            >
              Smart banking for the future. Empowering individuals and
              businesses to achieve their financial goals with trust
              and innovation.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-[#ccff00] hover:text-[#0d0d0d]"
                style={{
                  background: 'var(--bg-elevated)',
                  color:      'var(--text-secondary)',
                  border:     '1px solid var(--border-primary)',
                }}
              >
                <Facebook size={15} />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-[#ccff00] hover:text-[#0d0d0d]"
                style={{
                  background: 'var(--bg-elevated)',
                  color:      'var(--text-secondary)',
                  border:     '1px solid var(--border-primary)',
                }}
              >
                <Twitter size={15} />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-[#ccff00] hover:text-[#0d0d0d]"
                style={{
                  background: 'var(--bg-elevated)',
                  color:      'var(--text-secondary)',
                  border:     '1px solid var(--border-primary)',
                }}
              >
                <Linkedin size={15} />
              </a>
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div className="flex flex-col gap-5">
            <h4
              className="font-heading font-bold text-sm uppercase tracking-wider"
              style={{ color: 'var(--text-primary)' }}
            >
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3">

              <li>
                <Link
                  to="/"
                  className="text-sm transition-all duration-200 inline-flex items-center gap-2 group hover:text-[#ccff00]"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <span
                    className="w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ background: '#ccff00' }}
                  />
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/careers"
                  className="text-sm transition-all duration-200 inline-flex items-center gap-2 group hover:text-[#ccff00]"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <span
                    className="w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ background: '#ccff00' }}
                  />
                  Careers
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="text-sm transition-all duration-200 inline-flex items-center gap-2 group hover:text-[#ccff00]"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <span
                    className="w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ background: '#ccff00' }}
                  />
                  About
                </Link>
              </li>

              <li>
                <Link
                  to="/security"
                  className="text-sm transition-all duration-200 inline-flex items-center gap-2 group hover:text-[#ccff00]"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <span
                    className="w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ background: '#ccff00' }}
                  />
                  Security
                </Link>
              </li>

            </ul>
          </div>

          {/* Column 3 — Services */}
          <div className="flex flex-col gap-5">
            <h4
              className="font-heading font-bold text-sm uppercase tracking-wider"
              style={{ color: 'var(--text-primary)' }}
            >
              Services
            </h4>
            <ul className="flex flex-col gap-3">

              <li>
                <Link
                  to="/services"
                  className="text-sm transition-all duration-200 inline-flex items-center gap-2 group hover:text-[#ccff00]"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <span
                    className="w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ background: '#ccff00' }}
                  />
                  Checking Accounts
                </Link>
              </li>

              <li>
                <Link
                  to="/services"
                  className="text-sm transition-all duration-200 inline-flex items-center gap-2 group hover:text-[#ccff00]"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <span
                    className="w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ background: '#ccff00' }}
                  />
                  Savings Accounts
                </Link>
              </li>

              <li>
                <Link
                  to="/services"
                  className="text-sm transition-all duration-200 inline-flex items-center gap-2 group hover:text-[#ccff00]"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <span
                    className="w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ background: '#ccff00' }}
                  />
                  Loans & Mortgages
                </Link>
              </li>

              <li>
                <Link
                  to="/services"
                  className="text-sm transition-all duration-200 inline-flex items-center gap-2 group hover:text-[#ccff00]"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <span
                    className="w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ background: '#ccff00' }}
                  />
                  Mobile Banking
                </Link>
              </li>

              <li>
                <Link
                  to="/services"
                  className="text-sm transition-all duration-200 inline-flex items-center gap-2 group hover:text-[#ccff00]"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <span
                    className="w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ background: '#ccff00' }}
                  />
                  Business Banking
                </Link>
              </li>

            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div className="flex flex-col gap-5">
            <h4
              className="font-heading font-bold text-sm uppercase tracking-wider"
              style={{ color: 'var(--text-primary)' }}
            >
              Contact Us
            </h4>
            <ul className="flex flex-col gap-4">

              <li className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(204,255,0,0.1)' }}
                >
                  <Mail size={14} style={{ color: '#ccff00' }} />
                </div>
                <span
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  support@quantumbeaconbank.com
                </span>
              </li>

              <li className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(204,255,0,0.1)' }}
                >
                  <Phone size={14} style={{ color: '#ccff00' }} />
                </div>
                <span
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  +1 (555) 123 4567
                </span>
              </li>

              <li className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(204,255,0,0.1)' }}
                >
                  <MapPin size={14} style={{ color: '#ccff00' }} />
                </div>
                <span
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Somewhere in the World
                </span>
              </li>

            </ul>
          </div>

        </div>

        {/* Divider */}
        <div
          className="w-full h-px"
          style={{ background: 'var(--border-primary)' }}
        />

        {/* Bottom Bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">

          <p
            className="text-xs"
            style={{ color: 'var(--text-muted)' }}
          >
            © {currentYear} Quantum Beacon Bank. All Rights Reserved.
          </p>

          <div className="flex items-center gap-4">
            <Link
              to="#"
              className="text-xs hover:text-[#ccff00] transition-colors duration-200"
              style={{ color: 'var(--text-muted)' }}
            >
              Privacy Policy
            </Link>
            <span style={{ color: 'var(--border-secondary)' }}>|</span>
            <Link
              to="#"
              className="text-xs hover:text-[#ccff00] transition-colors duration-200"
              style={{ color: 'var(--text-muted)' }}
            >
              Terms of Service
            </Link>
            <span style={{ color: 'var(--border-secondary)' }}>|</span>
            <Link
              to="#"
              className="text-xs hover:text-[#ccff00] transition-colors duration-200"
              style={{ color: 'var(--text-muted)' }}
            >
              Cookie Policy
            </Link>
          </div>

        </div>
      </div>
    </footer>
  )
}