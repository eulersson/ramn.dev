"use client";

// React
import { useEffect } from "react";

// Third-Party
import { motion, useMotionValue } from "framer-motion";

// Project
import { toBool } from "@/utils";
import { useCursor } from "@/contexts/cursor";

export function Cursor() {
  const cursorX = useMotionValue(-500);
  const cursorY = useMotionValue(-500);

  const { cursorSize } = useCursor();

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

  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
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
