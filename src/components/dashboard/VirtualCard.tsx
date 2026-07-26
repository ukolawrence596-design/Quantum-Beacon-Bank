export interface VirtualCardProps {
  cardHolder: string;
  cardNumber: string;
  expiry: string;
  cvv?: string;
  brand?: string;
}

export default function VirtualCard({ cardHolder, cardNumber, expiry, cvv = "•••", brand = "Quantum Beacon" }: VirtualCardProps) {
  const maskedNumber = cardNumber.replace(/(\d{4})(?=\d)/g, "$1 ");

  return (
    <div className="rounded-[2rem] p-6 text-white" style={{ background: "linear-gradient(135deg, #0f172a, #111827)" }}>
      <div className="flex items-center justify-between mb-8">
        <span className="text-xs uppercase tracking-[0.3em]" style={{ color: "rgba(255,255,255,0.7)" }}>
          Virtual Card
        </span>
        <span className="text-xs font-semibold" style={{ color: "#ccff00" }}>
          {brand}
        </span>
      </div>
      <div className="text-lg tracking-[0.35em] font-semibold mb-8">{maskedNumber}</div>
      <div className="flex items-center justify-between text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.2em]">Card Holder</p>
          <p className="mt-1 font-semibold">{cardHolder}</p>
        </div>
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.2em]">Expiry</p>
          <p className="mt-1 font-semibold">{expiry}</p>
        </div>
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.2em]">CVV</p>
          <p className="mt-1 font-semibold">{cvv}</p>
        </div>
      </div>
    </div>
  );
}
