/**
 * Throttle
 * How to debounce and throttle in React without losing your mind
 * https://www.developerway.com/posts/debouncing-in-react
 */

// React
import { useEffect, useMemo, useRef } from "react";

// Third-Party
import throttle from "lodash.throttle";

/**
 * Throttles the given callback, which means that it will run it the first time it gets
 * called and from then if the user keeps running it we only execute the function on
 * 2 second intervals or wait 2 seconds until the value does not change anymore.
 *
 * @param callback Function to throttle.
 * @param amount Throttle ammount in milliseconds.
 *
 * @see {@link https://www.developerway.com/posts/debouncing-in-react | Debouncing in React}
 */
export const useThrottle = (callback: Function, amount: number) => {
  const ref = useRef<Function>(undefined);

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const throttledCallback = useMemo(() => {
    const func = (s: string) => {
      ref.current?.(s);
    };
    return throttle(func, amount, { leading: true, trailing: true });
  }, []);

  return throttledCallback;
};
