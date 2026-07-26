export const ROUTES = {
  // Public routes
  HOME: "/",
  ABOUT: "/about",
  CAREERS: "/careers",
  SECURITY: "/security",
  SERVICES: "/services",
  CONTACT: "/contact",
  FAQ: "/faq",

  // Auth routes
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  OTP_VERIFICATION: "/otp-verification",
  RESET_PASSWORD: "/reset-password",
  EMAIL_VERIFICATION: "/email-verification",

  // Dashboard routes
  DASHBOARD: "/dashboard",
  TRANSFER: "/dashboard/transfer",
  RECEIVE: "/dashboard/receive",
  TRANSACTION_HISTORY: "/dashboard/transactions",
  STATEMENTS: "/dashboard/statements",
  CARDS: "/dashboard/cards",
  PROFILE: "/dashboard/profile",
  DASHBOARD_SECURITY: "/dashboard/security",
  NOTIFICATIONS: "/dashboard/notifications",
  SUPPORT: "/dashboard/support",
  LOANS: "/dashboard/loans",
  MORTGAGE: "/dashboard/mortgage",

  // Admin routes
  ADMIN: "/admin",
  ADMIN_CUSTOMERS: "/admin/customers",
  ADMIN_TRANSACTIONS: "/admin/transactions",
  ADMIN_TOPUP: "/admin/topup",
  ADMIN_CARDS: "/admin/cards",
  ADMIN_LOANS: "/admin/loans",
  ADMIN_SECURITY: "/admin/security",
  ADMIN_SETTINGS: "/admin/settings",
  ADMIN_LOGS: "/admin/logs",

  // Error routes
  NOT_FOUND: "/404",
  UNAUTHORIZED: "/401",
  SERVER_ERROR: "/500",
};
