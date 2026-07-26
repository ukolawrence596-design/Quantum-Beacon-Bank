import { useState } from "react";
import { Save, Globe, Shield, DollarSign } from "lucide-react";

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    bankName: "Quantum Beacon Bank",
    supportEmail: "support@quantumbeaconbank.com",
    maxTransferLimit: "1000000",
    minTransferAmount: "1",
    maintenanceMode: false,
    emailNotifications: true,
    smsNotifications: false,
    twoFactorRequired: true,
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const inputStyle = {
    background: "var(--bg-input)",
    border: "1px solid var(--border-primary)",
    color: "var(--text-primary)",
    outline: "none",
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = "#ef4444";
    e.target.style.boxShadow = "0 0 0 3px rgba(239,68,68,0.1)";
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = "var(--border-primary)";
    e.target.style.boxShadow = "none";
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-2xl font-heading font-black"
            style={{ color: "var(--text-primary)" }}
          >
            System <span style={{ color: "#ef4444" }}>Settings</span>
          </h1>
          <p
            className="text-sm mt-1"
            style={{ color: "var(--text-secondary)" }}
          >
            Configure global system settings
          </p>
        </div>
        {saved && (
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold animate-fade-in-down"
            style={{
              background: "rgba(34,197,94,0.1)",
              color: "#22c55e",
              border: "1px solid rgba(34,197,94,0.2)",
            }}
          >
            ✓ Settings Saved!
          </div>
        )}
      </div>

      {/* General Settings */}
      {[
        {
          title: "General",
          icon: Globe,
          fields: [
            { label: "Bank Name", key: "bankName", type: "text" },
            { label: "Support Email", key: "supportEmail", type: "email" },
          ],
        },
        {
          title: "Transaction Limits",
          icon: DollarSign,
          fields: [
            {
              label: "Max Transfer Limit ($)",
              key: "maxTransferLimit",
              type: "number",
            },
            {
              label: "Min Transfer Amount ($)",
              key: "minTransferAmount",
              type: "number",
            },
          ],
        },
      ].map(({ title, icon: Icon, fields }) => (
        <div
          key={title}
          className="rounded-2xl p-6 flex flex-col gap-5"
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--border-primary)",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(239,68,68,0.1)" }}
            >
              <Icon size={16} style={{ color: "#ef4444" }} />
            </div>
            <h3
              className="font-heading font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              {title}
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {fields.map(({ label, key, type }) => (
              <div key={key} className="flex flex-col gap-2">
                <label
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--text-muted)" }}
                >
                  {label}
                </label>
                <input
                  type={type}
                  value={settings[key as keyof typeof settings] as string}
                  onChange={(e) =>
                    setSettings((p) => ({ ...p, [key]: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-full text-sm"
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Toggle Settings */}
      <div
        className="rounded-2xl p-6 flex flex-col gap-4"
        style={{
          background: "var(--bg-elevated)",
          border: "1px solid var(--border-primary)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(239,68,68,0.1)" }}
          >
            <Shield size={16} style={{ color: "#ef4444" }} />
          </div>
          <h3
            className="font-heading font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            System Toggles
          </h3>
        </div>

        {[
          {
            label: "Maintenance Mode",
            key: "maintenanceMode",
            desc: "Disable site for all users",
          },
          {
            label: "Email Notifications",
            key: "emailNotifications",
            desc: "Send email alerts to customers",
          },
          {
            label: "SMS Notifications",
            key: "smsNotifications",
            desc: "Send SMS alerts to customers",
          },
          {
            label: "Require 2FA for all users",
            key: "twoFactorRequired",
            desc: "Force two-factor authentication",
          },
        ].map(({ label, key, desc }) => (
          <div
            key={key}
            className="flex items-center justify-between py-3"
            style={{ borderBottom: "1px solid var(--border-primary)" }}
          >
            <div>
              <p
                className="text-sm font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                {label}
              </p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                {desc}
              </p>
            </div>
            <button
              onClick={() =>
                setSettings((p) => ({ ...p, [key]: !p[key as keyof typeof p] }))
              }
              className="relative w-12 h-6 rounded-full transition-all duration-300 shrink-0"
              style={{
                background: settings[key as keyof typeof settings]
                  ? "#ef4444"
                  : "var(--bg-hover)",
                border: settings[key as keyof typeof settings]
                  ? "none"
                  : "1px solid var(--border-primary)",
              }}
            >
              <div
                className="absolute top-0.5 w-5 h-5 rounded-full transition-all duration-300"
                style={{
                  background: settings[key as keyof typeof settings]
                    ? "#ffffff"
                    : "var(--text-muted)",
                  left: settings[key as keyof typeof settings] ? "26px" : "2px",
                }}
              />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-200 hover:scale-105 w-fit"
        style={{
          background: "#ef4444",
          color: "#ffffff",
          boxShadow: "0 0 20px rgba(239,68,68,0.3)",
        }}
      >
        <Save size={16} />
        Save All Settings
      </button>
    </div>
  );
}
