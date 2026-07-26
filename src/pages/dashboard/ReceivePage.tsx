import { useState } from "react";
import { Copy, Check, Download, Share2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function ReceivePage() {
  const [copied, setCopied] = useState<string | null>(null);
  const { profile } = useAuth();

  const accountDetails = {
    accountName:
      `${profile?.first_name || ""} ${profile?.last_name || ""}`.trim() ||
      "Loading...",
    accountNumber: profile?.account_number || "••••••••••",
    bankName: "Quantum Beacon Bank",
    routingNumber: "021000021",
    swiftCode: "QBBKUS33",
  };

  const handleCopy = (value: string, key: string) => {
    navigator.clipboard.writeText(value);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const labels: Record<string, string> = {
    accountName: "Account Name",
    accountNumber: "Account Number",
    bankName: "Bank Name",
    routingNumber: "Routing Number",
    swiftCode: "SWIFT Code",
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6">
      <div>
        <h1
          className="text-2xl font-heading font-black"
          style={{ color: "var(--text-primary)" }}
        >
          Receive <span style={{ color: "#ccff00" }}>Money</span>
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          Share your account details to receive payments instantly
        </p>
      </div>

      {/* QR Code Card */}
      <div
        className="rounded-2xl p-8 flex flex-col items-center gap-6 relative overflow-hidden"
        style={{
          background: `radial-gradient(ellipse at top, rgba(204,255,0,0.08) 0%, transparent 60%), var(--bg-elevated)`,
          border: "1px solid rgba(204,255,0,0.15)",
        }}
      >
        <div
          className="absolute top-0 right-0 w-32 h-32 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ccff00 1px, transparent 1px)",
            backgroundSize: "12px 12px",
            maskImage:
              "radial-gradient(ellipse at top right, black 0%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at top right, black 0%, transparent 70%)",
          }}
        />

        {/* QR Code Visual */}
        <div
          className="w-48 h-48 rounded-2xl flex items-center justify-center relative"
          style={{
            background: "var(--bg-hover)",
            border: "2px dashed var(--border-secondary)",
          }}
        >
          <div className="grid grid-cols-8 gap-0.5 p-3">
            {Array.from({ length: 64 }).map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 rounded-sm"
                style={{
                  background: [
                    0, 1, 2, 3, 4, 5, 6, 8, 14, 16, 21, 24, 29, 32, 37, 40, 45,
                    48, 53, 56, 57, 58, 59, 60, 61, 62, 63,
                  ].includes(i)
                    ? "#ccff00"
                    : Math.random() > 0.6
                      ? "#ccff00"
                      : "transparent",
                  opacity: 0.9,
                }}
              />
            ))}
          </div>
          <div
            className="absolute w-10 h-10 rounded-lg flex items-center justify-center font-black text-sm"
            style={{ background: "#ccff00", color: "#0d0d0d" }}
          >
            QB
          </div>
        </div>

        <div className="text-center">
          <p
            className="font-heading font-black text-xl"
            style={{ color: "var(--text-primary)" }}
          >
            {accountDetails.accountName}
          </p>
          <p
            className="text-sm tracking-widest mt-1"
            style={{ color: "var(--text-secondary)" }}
          >
            {accountDetails.accountNumber}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() =>
              handleCopy(
                Object.entries(accountDetails)
                  .map(([k, v]) => `${labels[k]}: ${v}`)
                  .join("\n"),
                "qr",
              )
            }
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105"
            style={{ background: "#ccff00", color: "#0d0d0d" }}
          >
            <Download size={15} />
            Save QR
          </button>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: "My QBBank Account",
                  text: `Send money to ${accountDetails.accountName}\nAccount: ${accountDetails.accountNumber}\nBank: ${accountDetails.bankName}`,
                });
              }
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105"
            style={{
              background: "var(--bg-hover)",
              color: "var(--text-primary)",
              border: "1px solid var(--border-primary)",
            }}
          >
            <Share2 size={15} />
            Share
          </button>
        </div>
      </div>

      {/* Account Details */}
      <div
        className="rounded-2xl p-6 flex flex-col gap-4"
        style={{
          background: "var(--bg-elevated)",
          border: "1px solid var(--border-primary)",
        }}
      >
        <h3
          className="font-heading font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          Account Details
        </h3>

        {Object.entries(accountDetails).map(([key, value]) => (
          <div
            key={key}
            className="flex items-center justify-between py-3"
            style={{ borderBottom: "1px solid var(--border-primary)" }}
          >
            <div>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                {labels[key]}
              </p>
              <p
                className="text-sm font-semibold mt-0.5"
                style={{ color: "var(--text-primary)" }}
              >
                {value}
              </p>
            </div>
            <button
              onClick={() => handleCopy(value, key)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 hover:scale-105"
              style={{
                background:
                  copied === key ? "rgba(34,197,94,0.1)" : "var(--bg-hover)",
                color: copied === key ? "#22c55e" : "var(--text-secondary)",
                border:
                  copied === key
                    ? "1px solid rgba(34,197,94,0.2)"
                    : "1px solid var(--border-primary)",
              }}
            >
              {copied === key ? (
                <>
                  <Check size={12} /> Copied!
                </>
              ) : (
                <>
                  <Copy size={12} /> Copy
                </>
              )}
            </button>
          </div>
        ))}

        {/* Copy All */}
        <button
          onClick={() => {
            const text = Object.entries(accountDetails)
              .map(([k, v]) => `${labels[k]}: ${v}`)
              .join("\n");
            navigator.clipboard.writeText(text);
            setCopied("all");
            setTimeout(() => setCopied(null), 2000);
          }}
          className="w-full py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2 mt-2"
          style={{
            background:
              copied === "all" ? "rgba(34,197,94,0.1)" : "var(--bg-hover)",
            color: copied === "all" ? "#22c55e" : "var(--text-secondary)",
            border:
              copied === "all"
                ? "1px solid rgba(34,197,94,0.2)"
                : "1px solid var(--border-primary)",
          }}
        >
          {copied === "all" ? (
            <>
              <Check size={14} /> All Details Copied!
            </>
          ) : (
            <>
              <Copy size={14} /> Copy All Details
            </>
          )}
        </button>
      </div>
    </div>
  );
}
