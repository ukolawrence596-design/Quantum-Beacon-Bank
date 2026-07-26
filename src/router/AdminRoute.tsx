import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import PageLoader from "../components/special/PageLoader";

export default function AdminRoute() {
  const { isAdmin, isAuthenticated, loading, profileLoading } = useAuth();

  // Wait for both auth AND profile to load
  if (loading || profileLoading) return <PageLoader />;

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
}
