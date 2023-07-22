// React
import { createContext, useContext } from "react";

// Third-Party
import { MotionValue, useMotionValue, useSpring } from "framer-motion";

const CursorContext = createContext<[MotionValue, Function] | null>(null);

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const cursorSize = useMotionValue(1);
  const cursorSizeAnimated = useSpring(cursorSize, { damping: 10});
  const setCursorSize = (value: number) => cursorSize.set(value);

  return (
    <CursorContext.Provider value={[cursorSizeAnimated, setCursorSize]}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  return useContext(CursorContext);
}
