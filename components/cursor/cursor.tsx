"use client";

// React
import { createContext, useContext, useEffect, useState } from "react";

// Third-Part
import { MotionValue, motion, useMotionValue, useSpring } from "motion/react";

// Project
import { ContextNotProvidedError } from "@/errors/context-not-provided";
import { useTouchDevice } from "@/hooks/touch-device";
import { toBool } from "@/utils";

// -- Cursor Context & Provider --------------------------------------------------------
const CursorContext = createContext<{
  cursorSize: MotionValue;
  setCursorSize: Function;
} | null>(null);

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const cursorSize = useMotionValue(0);
  const cursorSizeAnim = useSpring(cursorSize, { damping: 10 });
  const setCursorSize = (value: number) => cursorSize.set(value);

  useEffect(() => {
    // Since `cursorSize` starts at 0 this will give it an initial bounce.
    cursorSize.set(1);
  }, []);

  return (
    <CursorContext.Provider
      value={{ cursorSize: cursorSizeAnim, setCursorSize }}
    >
      {children}
    </CursorContext.Provider>
  );
}

// -- Cursor Hook ----------------------------------------------------------------------
export function useCursor() {
  const isTouchDevice = useTouchDevice();

  const context = useContext(CursorContext);

  if (isTouchDevice === false && context === null) {
    throw new ContextNotProvidedError("CursorContext");
  }

  return context;
}

// -- Cursor Component -----------------------------------------------------------------
/**
 * The regular browser cursor is hidden and a circle is showed instead.
 */
export function Cursor() {
  const cursorX = useMotionValue(-500);
  const cursorY = useMotionValue(-500);

  const cursorContext = useCursor();

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[Cursor] Rendering");
  }

  return (
    <motion.div
      className="cursor z-50"
      style={{
        x: cursorX,
        y: cursorY,
        ...(cursorContext && { scale: cursorContext.cursorSize }),
      }}
    ></motion.div>
  );
}

// -- Cursor Size Directive ------------------------------------------------------------
/**
 * Directive to wrap elements so that when the mouse is moved over them they change the
 * cursor size specified in `sizeOnHover`.
 */
export function CursorSize({
  className,
  children,
  sizeOnHover,
}: {
  className?: string;
  children: React.ReactNode;
  sizeOnHover: number;
}) {
  const isTouchDevice = useTouchDevice();
  const context = useCursor();
  if (isTouchDevice || context === null) {
    return children;
  } else {
    return (
      <div
        className={className}
        onMouseEnter={() => context.setCursorSize(sizeOnHover)}
        onMouseLeave={() => context.setCursorSize(1)}
      >
        {children}
      </div>
    );
  }
}
