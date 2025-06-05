import { useMediaQuery } from 'react-responsive';
import tailwindConfig from '../tailwind.config.mjs'; // Your tailwind config

type BreakpointKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

type Breakpoints = {
  [key in BreakpointKey]: string;
};

const breakpoints = tailwindConfig.theme!.screens as Breakpoints;

/**
 * A React hook that returns information about the viewport width in relation to a Tailwind breakpoint.
 * 
 * The hook returns an object with:
 * - A dynamically named boolean property in the format `is{Breakpoint}` (e.g., `isMd`)
 * - The breakpoint value in pixels (e.g., '768px')
 * - `isSmaller`: true if the viewport is smaller than the breakpoint
 * - `isLarger`: true if the viewport is larger than or equal to the breakpoint
 * 
 * This mimics Tailwind's breakpoint behavior where `md:class` applies when the viewport
 * is larger than or equal to the 'md' breakpoint.
 * 
 * @example
 * // Usage example:
 * const { isMd, breakpoint, isSmaller, isLarger } = useBreakpoint('md');
 * if (isLarger) {
 *   console.log(`Viewport is at least ${breakpoint}`);
 * }
 * 
 * @param {BreakpointKey} breakpointKey - The Tailwind breakpoint to check ('xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl')
 * @returns {Record<`is${Capitalize<K>}`, boolean> & { 
 *   breakpoint: string, 
 *   isSmaller: boolean, 
 *   isLarger: boolean 
 * }} An object with breakpoint information
 */
export function useBreakpoint<K extends BreakpointKey>(breakpointKey: K) {
  let bool = false;
  const breakpoint = breakpoints?.[breakpointKey];

  if (breakpoint) {
    bool = useMediaQuery({
      query: `(min-width: ${breakpoint})`,
    });
  }

  const capitalizedKey = breakpointKey[0].toUpperCase() + breakpointKey.substring(1);
  type Key = `is${Capitalize<K>}`;

  return {
    [`is${capitalizedKey}`]: bool,
    breakpoint,
    isSmaller: !bool,
    isLarger: bool,
  } as Record<Key, boolean> & { 
    breakpoint: string, 
    isSmaller: boolean, 
    isLarger: boolean 
  };
}
