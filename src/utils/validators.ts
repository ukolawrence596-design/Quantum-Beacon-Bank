export const validators = {
  email: (value: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value) || "Please enter a valid email address";
  },

  password: (value: string) => {
    if (value.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(value))
      return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(value))
      return "Password must contain at least one lowercase letter";
    if (!/[0-9]/.test(value))
      return "Password must contain at least one number";
    if (!/[^A-Za-z0-9]/.test(value))
      return "Password must contain at least one special character";
    return true;
  },

  phone: (value: string) => {
    const regex = /^\+?[\d\s\-()]{10,15}$/;
    return regex.test(value) || "Please enter a valid phone number";
  },

  required: (value: string) => {
    return value?.trim().length > 0 || "This field is required";
  },

  accountNumber: (value: string) => {
    return /^\d{10}$/.test(value) || "Account number must be 10 digits";
  },

  amount: (value: number) => {
    if (value <= 0) return "Amount must be greater than zero";
    if (value > 1000000) return "Amount cannot exceed $1,000,000";
    return true;
  },

  otp: (value: string) => {
    return /^\d{6}$/.test(value) || "OTP must be exactly 6 digits";
  },
};
