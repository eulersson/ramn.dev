// Third-Party
import { useEffect, useMemo, useRef } from "react";
import debounce from "lodash.debounce";

/**
 * Debounces the given callback, which means it will delay executing the function until
 * after a certain amount of time has elapsed since the last time it was called.
 *
 * @param callback Function to debounce.
 * @param amount Debounce amount in milliseconds.
 *
 * @see {@link https://www.developerway.com/posts/debouncing-in-react | Debouncing in React}
 */
export const useDebounce = (callback: Function, amount: number) => {
  const ref = useRef<Function>(undefined);

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = (...args: any[]) => {
      ref.current?.(...args);
    };
    return debounce(func, amount);
  }, [amount]);

  return debouncedCallback;
};
