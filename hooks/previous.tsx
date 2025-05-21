import { useEffect, useRef } from "react";

export function usePrevious<T>(value: T) {
  const currRef = useRef<T>(undefined);
  const prevRef = useRef<T>(undefined);
  useEffect(() => {
    if (value !== currRef.current) {
      prevRef.current = currRef.current
      currRef.current = value
    }
  }, [value]);
  return prevRef.current;
}
