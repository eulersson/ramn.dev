import { useEffect, useRef } from "react";

export function usePrevious<T>(value: T) {
  const currRef = useRef<T>();
  const prevRef = useRef<T>();
  useEffect(() => {
    if (value !== currRef.current) {
      prevRef.current = currRef.current
      currRef.current = value
    }
  }, [value]);
  return prevRef.current;
}
