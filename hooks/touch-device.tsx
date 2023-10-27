import { useMemo } from "react";

/**
 * Identifies when we are using a touch screen.
 */
export function useTouchDevice() {
  const isTouchDevice = useMemo(
    () => "ontouchstart" in window || navigator.maxTouchPoints > 0,
    []
  );
  return isTouchDevice;
}
