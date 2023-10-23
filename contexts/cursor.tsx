"use client";

// React
import { createContext, useContext, useEffect } from "react";

// Third-Party
import { MotionValue, useMotionValue, useSpring } from "framer-motion";

// Project
import { ContextNotProvidedError } from "@/errors/context-not-provided";

const CursorContext = createContext<{
  cursorSize: MotionValue;
  setCursorSize: Function;
} | null>(null);

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const cursorSize = useMotionValue(0);
  const cursorSizeAnimated = useSpring(cursorSize, { damping: 10 });
  const setCursorSize = (value: number) => cursorSize.set(value);

  useEffect(() => {
    cursorSize.set(1);
  }, []);

  return (
    <CursorContext.Provider
      value={{ cursorSize: cursorSizeAnimated, setCursorSize }}
    >
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const context = useContext(CursorContext);

  if (context === null) {
    throw new ContextNotProvidedError("CursorContext");
  }

  return context;
}
