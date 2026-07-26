import { createContext, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";

interface ToastContextType {
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showInfo: (message: string) => void;
  showWarning: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const showSuccess = (message: string) =>
    toast.success(message, {
      style: {
        background: "#1a1a1a",
        color: "#ffffff",
        border: "1px solid #22c55e",
      },
      iconTheme: { primary: "#22c55e", secondary: "#1a1a1a" },
    });

  const showError = (message: string) =>
    toast.error(message, {
      style: {
        background: "#1a1a1a",
        color: "#ffffff",
        border: "1px solid #ef4444",
      },
      iconTheme: { primary: "#ef4444", secondary: "#1a1a1a" },
    });

  const showInfo = (message: string) =>
    toast(message, {
      style: {
        background: "#1a1a1a",
        color: "#ffffff",
        border: "1px solid #3b82f6",
      },
      icon: "ℹ️",
    });

  const showWarning = (message: string) =>
    toast(message, {
      style: {
        background: "#1a1a1a",
        color: "#ffffff",
        border: "1px solid #f59e0b",
      },
      icon: "⚠️",
    });

  return (
    <ToastContext.Provider
      value={{ showSuccess, showError, showInfo, showWarning }}
    >
      {children}
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
}
