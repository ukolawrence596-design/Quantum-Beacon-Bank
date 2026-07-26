import { useEffect, useState } from "react";

export default function useLocalStorage<ValueType>(key: string, initialValue: ValueType) {
  const [storedValue, setStoredValue] = useState<ValueType>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as ValueType) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      // Ignore write errors
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}
