import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import PublicRoute from "./PublicRoute";
import HomePage from "../pages/landing/HomePage";
import AboutPage from "../pages/landing/AboutPage";
import CareersPage from "../pages/landing/CareersPage";
import ContactPage from "../pages/landing/ContactPage";
import FAQPage from "../pages/landing/FAQPage";
import ServicesPage from "../pages/landing/ServicesPage";
import SecurityPage from "../pages/landing/SecurityPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import OTPVerificationPage from "../pages/auth/OTPVerificationPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import DashboardHome from "../pages/dashboard/DashboardHome";
import TransferPage from "../pages/dashboard/TransferPage";
import ReceivePage from "../pages/dashboard/ReceivePage";
import TransactionHistoryPage from "../pages/dashboard/TransactionHistoryPage";
import StatementsPage from "../pages/dashboard/StatementsPage";
import CardsPage from "../pages/dashboard/CardsPage";
import ProfilePage from "../pages/dashboard/ProfilePage";
import DashboardSecurityPage from "../pages/dashboard/SecurityPage";
import NotificationsPage from "../pages/dashboard/NotificationsPage";
import SupportPage from "../pages/dashboard/SupportPage";
import LoanPage from "../pages/dashboard/LoanPage";
import MortgagePage from "../pages/dashboard/MortgagePage";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminCustomers from "../pages/admin/AdminCustomers";
import AdminTransactions from "../pages/admin/AdminTransactions";
import AdminTopUp from "../pages/admin/AdminTopUp";
import AdminCards from "../pages/admin/AdminCards";
import AdminLoans from "../pages/admin/AdminLoans";
import AdminSecurity from "../pages/admin/AdminSecurity";
import AdminSettings from "../pages/admin/AdminSettings";
import AdminLogsPage from "../pages/admin/AdminLogsPage";
import NotFoundPage from "../pages/error/NotFoundPage";

const router = createBrowserRouter([
  // ── Public landing pages ──────────────────────────
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "services", element: <ServicesPage /> },
      { path: "faq", element: <FAQPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "careers", element: <CareersPage /> },
      { path: "security", element: <SecurityPage /> },
    ],
  },
  {
    path: "/",
    element: <PublicRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: "login", element: <LoginPage /> },
          { path: "register", element: <RegisterPage /> },
          { path: "forgot-password", element: <ForgotPasswordPage /> },
          { path: "otp-verification", element: <OTPVerificationPage /> },
          { path: "reset-password", element: <ResetPasswordPage /> },
        ],
      },
    ],
  },

  // ── Protected dashboard (must be logged in) ───────
  {
    path: "/dashboard",
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { index: true, element: <DashboardHome /> },
          { path: "transfer", element: <TransferPage /> },
          { path: "receive", element: <ReceivePage /> },
          { path: "transactions", element: <TransactionHistoryPage /> },
          { path: "statements", element: <StatementsPage /> },
          { path: "cards", element: <CardsPage /> },
          { path: "profile", element: <ProfilePage /> },
          { path: "security", element: <DashboardSecurityPage /> },
          { path: "notifications", element: <NotificationsPage /> },
          { path: "support", element: <SupportPage /> },
          { path: "loans", element: <LoanPage /> },
          { path: "mortgage", element: <MortgagePage /> },
        ],
      },
    ],
  },

  // ── Admin panel (must be admin) ───────────────────
  {
    path: "/admin",
    element: <AdminRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: "analytics", element: <AdminDashboard /> },
          { path: "customers", element: <AdminCustomers /> },
          { path: "transactions", element: <AdminTransactions /> },
          { path: "topup", element: <AdminTopUp /> },
          { path: "cards", element: <AdminCards /> },
          { path: "loans", element: <AdminLoans /> },
          { path: "security", element: <AdminSecurity /> },
          { path: "settings", element: <AdminSettings /> },
          { path: "logs", element: <AdminLogsPage /> },
        ],
      },
    ],
  },

  { path: "*", element: <NotFoundPage /> },
]);

export default router;
