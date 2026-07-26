import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import PageLoader from "../components/special/PageLoader";

export default function ProtectedRoute() {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) return <PageLoader />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // Admin should never see customer dashboard
  if (isAdmin) return <Navigate to="/admin" replace />;

  return <Outlet />;
}
