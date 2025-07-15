"use client";

// React
import { createContext, useContext, useEffect, useState } from "react";

// Third-Party
import {
  MotionValue,
  SpringOptions,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";

// Project
import { ContextNotProvidedError } from "@/errors/context-not-provided";
import { useBrowserTooLaggy, useSafari, useTouchDevice } from "@/hooks/browser";
import { cn, toBool } from "@/lib";

// In Safari in macOS, if you scale an HTML element with transform rules you
// see jaggy edges, just as it didn't have enough resolution.
const BASE_SIZE = 4;

// -- Cursor Context & Provider --------------------------------------------------------
const CursorContext = createContext<{
  cursorSize: MotionValue;
  setCursorSize: (size: number) => void;
  setCursorTap: (size: number) => void;
  cursorSizeRaw: number;
} | null>(null);

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [cursorSizeRaw, setCursorSizeRaw] = useState(0);
  const cursorSize = useMotionValue(0);
  const isSafari = useSafari();
  const isTouch = useTouchDevice();
  const springOptions: SpringOptions = isTouch
    ? { damping: 20, mass: 0.5, stiffness: 130 }
    : { damping: 10, mass: 1.0, stiffness: 100 };
  const cursorSizeAnim = useSpring(cursorSize, springOptions);
  const setCursorSize = (value: number) => {
    setCursorSizeRaw(value);
    if (isSafari) {
      cursorSize.set(value / BASE_SIZE);
    } else {
      cursorSize.set(value);
    }
  };

  const setCursorTap = (value: number) => {
    cursorSize.set(value);
    setTimeout(() => {
      cursorSize.set(0);
    }, 100);
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
      value={{
        cursorSize: cursorSizeAnim,
        setCursorSize,
        setCursorTap,
        cursorSizeRaw,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
}

// -- Cursor Hook ----------------------------------------------------------------------
export function useCursor() {
  const context = useContext(CursorContext);

  if (context === null) {
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

  const isTouch = useTouchDevice();
  const isSafari = useSafari();

  const avoidMixBlendDifference = useBrowserTooLaggy();

  useEffect(() => {
    // Only show the cursor after client-side hydration is complete
    setIsMounted(true);

    if (isTouch) {
      const onClick = (e: MouseEvent) => {
        const touch = e;
        if (touch) {
          cursorX.set(touch.clientX - (isSafari ? 64 : 16));
          cursorY.set(touch.clientY - (isSafari ? 64 : 16));
          cursorContext.setCursorTap(1);
        }
      };
      window.addEventListener("click", onClick);
      return () => {
        window.removeEventListener("click", onClick);
      };
    } else {
      const mouseMove = (e: MouseEvent) => {
        cursorX.set(e.clientX - (isSafari ? 64 : 16));
        cursorY.set(e.clientY - (isSafari ? 64 : 16));
      };
      window.addEventListener("mousemove", mouseMove);
      return () => {
        window.removeEventListener("mousemove", mouseMove);
      };
    }
  }, []);

  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[Cursor] Rendering");
  }

  // Don't render the custom cursor until after hydration is complete
  if (!isMounted) return null;

  return avoidMixBlendDifference ? (
    <motion.div
      className={cn(
        "h-[40px] w-[40px]",
        "cursor z-70",
        "bg-[radial-gradient(circle,transparent_14px,var(--col-fore)_14px,var(--col-fore)_16px,var(--col-back)_16px,var(--col-back)_18px,var(--col-fore)_18px,var(--col-fore)_20px)]",
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
        isSafari ? "h-[128px] w-[128px]" : "h-[32px] w-[32px]",
        "cursor z-70 bg-white mix-blend-difference",
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
  className = "",
  children,
  sizeOnHover,
}: {
  className?: string;
  children: React.ReactNode;
  sizeOnHover: number;
}) {
  const isTouch = useTouchDevice();
  const context = useCursor();
  if (context === null || !isTouch) {
    return children;
  } else {
    return (
      <div
        className={cn("pointer-events-auto", className)}
        onMouseEnter={() => context.setCursorSize(sizeOnHover)}
        onMouseLeave={() => context.setCursorSize(1)}
      >
        {children}
      </div>
    );
  }
}
