import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import PageLoader from "../components/special/PageLoader";

export default function PublicRoute() {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  // Wait for auth to load before redirecting
  if (loading) return <PageLoader />;

  if (isAuthenticated) {
    return isAdmin ? (
      <Navigate to="/admin" replace />
    ) : (
      <Navigate to="/dashboard" replace />
    );
  }

  return <Outlet />;
}
