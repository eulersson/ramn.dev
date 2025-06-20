// Third-Party
import { useMemo } from "react";

// Project
import { isMacOSChromium, isSafari, isTouchDevice } from "@/utils/browser";
import { useBreakpoint } from "@/hooks/breakpoint";

export function useMacMacOSChromium() {
  return useMemo(() => isMacOSChromium(), []);
}

export function useSafari() {
  return useMemo(() => isSafari(), []);
}

export function useTouchDevice() {
  return useMemo(() => isTouchDevice(), []);
}

export function useBrowserTooLaggy() {
  const isMacOSChromium = useMacMacOSChromium();
  const { isSmaller } = useBreakpoint("lg");
  return isMacOSChromium && !isSmaller;
}
