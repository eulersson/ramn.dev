import { useMemo } from "react";

/**
 * Identifies when we are using a touch screen.
 */
export function useTouchDevice() {
  const isTouchDevice = useMemo(() => {
    if (typeof window === "undefined") return false;
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }, []);
  return isTouchDevice;
}
