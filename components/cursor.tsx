"use client";

// React
import { useEffect } from "react";

// Third-Party
import { motion, useMotionValue } from "framer-motion";

// Project
import { useCursor } from "@/contexts/cursor";

// Environment
import environment from "@/environment";

export function Cursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const {cursorSize, setCursorSize} = useCursor();

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, [cursorX, cursorY]);

  if (environment.printComponentRendering) {
    console.log("[Cursor] Rendering");
  }

  return (
    <motion.div
      className="cursor z-50"
      style={{
        x: cursorX,
        y: cursorY,
        scale: cursorSize,
      }}
    ></motion.div>
  );
}
