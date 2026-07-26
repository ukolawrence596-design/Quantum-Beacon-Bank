import { Outlet } from "react-router-dom";
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";
import BackToTop from "../components/special/BackToTop";
import ScrollProgressBar from "../components/special/ScrollProgressBar";
import SmartSuppChat from "../components/special/SmartSuppChat";

export default function RootLayout() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--bg-primary)" }}
    >
      <ScrollProgressBar />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
      <SmartSuppChat />
    </div>
  );
}
