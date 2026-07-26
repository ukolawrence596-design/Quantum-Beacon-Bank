export const APP_CONFIG = {
  name: "Quantum Beacon Bank",
  shortName: "QBB",
  description: "Smart Banking for the Future",
  version: "1.0.0",
  currency: "USD",
  locale: "en-US",
  supportEmail: "support@quantumbeaconbank.com",
  maxTransferAmount: 1000000,
  minTransferAmount: 1,
  otpExpiryMinutes: 10,
  sessionTimeoutMinutes: 30,
};

export const SUPABASE_CONFIG = {
  url: import.meta.env.VITE_SUPABASE_URL as string,
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY as string,
};
