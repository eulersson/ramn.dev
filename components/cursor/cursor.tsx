"use client";

// React
import { createContext, useContext, useEffect, useState } from "react";

// Third-Party
import { MotionValue, motion, useMotionValue, useSpring } from "motion/react";

// Project
import { ContextNotProvidedError } from "@/errors/context-not-provided";
import { useBrowserTooLaggy, useSafari, useTouchDevice } from "@/hooks/browser";
import { cn, toBool } from "@/utils";

// In Safari in macOS, if you scale an HTML element with transform rules you
// see jaggy edges, just as it didn't have enough resolution.
const BASE_SIZE = 4;

// -- Cursor Context & Provider --------------------------------------------------------
const CursorContext = createContext<{
  cursorSize: MotionValue;
  setCursorSize: Function;
  cursorSizeRaw: number;
} | null>(null);

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [cursorSizeRaw, setCursorSizeRaw] = useState(0);
  const cursorSize = useMotionValue(0);
  const isSafari = useSafari();
  const cursorSizeAnim = useSpring(cursorSize, { damping: 10 });
  const setCursorSize = (value: number) => {
    setCursorSizeRaw(value);
    if (isSafari) {
      cursorSize.set(value / BASE_SIZE);
    } else {
      cursorSize.set(value);
    }
  };

  useEffect(() => {
    // Since `cursorSize` starts at 0 this will give it an initial bounce.
    if (isSafari) {
      cursorSize.set(1 / BASE_SIZE);
    } else {
      cursorSize.set(1);
    }
  }, []);

  return (
    <CursorContext.Provider
      value={{ cursorSize: cursorSizeAnim, setCursorSize, cursorSizeRaw }}
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
  const [isMounted, setIsMounted] = useState(false);

  const isSafari = useSafari();

  const avoidMixBlendDifference = useBrowserTooLaggy();

  useEffect(() => {
    // Only show the cursor after client-side hydration is complete
    setIsMounted(true);

    const mouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - (isSafari ? 64 : 16));
      cursorY.set(e.clientY - (isSafari ? 64 : 16));
    };
    window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[Cursor] Rendering");
  }

  // Don't render the custom cursor until after hydration is complete
  if (!isMounted) return null;

  return avoidMixBlendDifference ? (
    <motion.div
      className={cn(
        "w-[40px] h-[40px]",
        "cursor z-50 bg-[radial-gradient(circle,transparent_14px,black_14px,black_16px,white_16px,white_18px,black_18px,black_20px)]",
      )}
      style={{
        x: cursorX,
        y: cursorY,
        ...(cursorContext && { scale: cursorContext.cursorSize }),
      }}
    ></motion.div>
  ) : (
    <motion.div
      className={cn(
        isSafari ? "w-[128px] h-[128px]" : "w-[32px] h-[32px]",
        "cursor z-50 bg-white mix-blend-difference",
      )}
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
