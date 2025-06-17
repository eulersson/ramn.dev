import { useMediaQuery } from "react-responsive";
import { Breakpoints, BreakpointKey } from "@/types";
import { useEffect, useRef, useCallback } from "react";

// Default Tailwind CSS v4 breakpoints (must be aligned with `global.css`)
const breakpoints: Breakpoints = {
  xs: "475px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

/**
 * A React hook that returns viewport information relative to a Tailwind breakpoint.
 * 
 * This hook mimics Tailwind's breakpoint behavior where classes like `md:class` 
 * apply when the viewport width is greater than or equal to the specified breakpoint.
 * 
 * @param breakpointKey - The breakpoint key to check against (xs, sm, md, lg, xl, 2xl)
 * 
 * @returns An object containing:
 *   - `is{BreakpointKey}`: Boolean indicating if viewport meets or exceeds the breakpoint
 *   - `breakpoint`: The pixel value of the breakpoint (e.g., "768px")
 *   - `isSmaller`: Boolean indicating if viewport is smaller than the breakpoint
 *   - `isLarger`: Boolean indicating if viewport is larger than or equal to the breakpoint
 * 
 * @example
 * ```tsx
 * const { isMd, breakpoint, isSmaller, isLarger } = useBreakpoint('md');
 * 
 * return (
 *   <div>
 *     {isMd && <p>Desktop view</p>}
 *     {isSmaller && <p>Mobile view</p>}
 *     <p>Breakpoint: {breakpoint}</p>
 *   </div>
 * );
 * ```
 */
export function useBreakpoint<K extends BreakpointKey>(breakpointKey: K) {
  let bool = false;
  const breakpoint = breakpoints?.[breakpointKey];

  if (breakpoint) {
    bool = useMediaQuery({
      query: `(min-width: ${breakpoint})`,
    });
  }

  const capitalizedKey =
    breakpointKey[0].toUpperCase() + breakpointKey.substring(1);
  type Key = `is${Capitalize<K>}`;

  return {
    [`is${capitalizedKey}`]: bool,
    breakpoint,
    isSmaller: !bool,
    isLarger: bool,
  } as Record<Key, boolean> & {
    breakpoint: string;
    isSmaller: boolean;
    isLarger: boolean;
  };
}

/**
 * A React hook that monitors window resize events and triggers a callback
 * whenever the active breakpoint changes.
 *
 * @param callback - Function called when the breakpoint changes, receives the new breakpoint key
 * @param debounceMs - Optional debounce delay in milliseconds (default: 100ms)
 */
export function useBreakpointChange(
  callback: (breakpoint: BreakpointKey) => void,
  debounceMs: number = 100
) {
  const previousBreakpoint = useRef<BreakpointKey | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Function to determine current breakpoint based on window width
  const getCurrentBreakpoint = useCallback((): BreakpointKey => {
    if (typeof window === 'undefined') return 'xs';
    
    const width = window.innerWidth;
    const breakpointEntries = Object.entries(breakpoints) as [BreakpointKey, string][];
    
    // Sort breakpoints by pixel value (descending) to check from largest to smallest
    const sortedBreakpoints = breakpointEntries.sort((a, b) => {
      const aValue = parseInt(a[1]);
      const bValue = parseInt(b[1]);
      return bValue - aValue;
    });

    // Find the first breakpoint that the current width meets or exceeds
    for (const [key, value] of sortedBreakpoints) {
      if (width >= parseInt(value)) {
        return key;
      }
    }
    
    // If no breakpoint matches, return the smallest one
    return 'xs';
  }, []);

  // Debounced resize handler
  const handleResize = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      const currentBreakpoint = getCurrentBreakpoint();
      
      if (previousBreakpoint.current !== currentBreakpoint) {
        previousBreakpoint.current = currentBreakpoint;
        callback(currentBreakpoint);
      }
    }, debounceMs);
  }, [callback, debounceMs, getCurrentBreakpoint]);

  useEffect(() => {
    // Set initial breakpoint
    const initialBreakpoint = getCurrentBreakpoint();
    previousBreakpoint.current = initialBreakpoint;
    callback(initialBreakpoint);

    // Add resize listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleResize, callback, getCurrentBreakpoint]);
}
