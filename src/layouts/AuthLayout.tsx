import { Outlet } from "react-router-dom";
import BackToTop from "../components/special/BackToTop";

export default function AuthLayout() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--bg-primary)" }}
    >
      <main className="flex-1">
        <Outlet />
      </main>
      <BackToTop />
    </div>
  );
}
