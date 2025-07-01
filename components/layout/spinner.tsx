// React
import React from "react";

// Third-Party
import { motion } from "framer-motion";

// Project
import { cn } from "@/lib";

export const SPINNER_CYCLE_DURATION_SECONDS = 5;

export const Spinner = ({ className }: { className?: string }) => {
  // Square wave pattern with very tight spacing
  const zigzagPath = `
    M 50 60
    L 50 20
    L 65 20
    L 65 60
    L 80 60
    L 80 20
    L 95 20
    L 95 60
    L 110 60
    L 110 20
    L 125 20
    L 125 60
    L 140 60
    L 140 20
    L 155 20
    L 155 60
    L 170 60
    L 170 20
    L 185 20
    L 185 60
    L 200 60
    L 200 20
    L 215 20
    L 215 60
    L 230 60
    L 230 20
    L 245 20
    L 245 60
    L 260 60
    L 260 20
    L 275 20
    L 275 60
    L 290 60
    L 290 20
    L 305 20
    L 305 60
    L 320 60
  `;

  return (
    <div
      className={cn(
        "bg-back border-2-fore flex items-center justify-center",
        className,
      )}
    >
      <svg width="400" height="80" viewBox="0 0 400 80">
        <motion.path
          d={zigzagPath}
          stroke="var(--col-fore)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, pathOffset: 0 }}
          animate={{
            pathLength: [0, 1, 0],
            pathOffset: [0, 0, 1],
          }}
          transition={{
            duration: SPINNER_CYCLE_DURATION_SECONDS,
            times: [0, 0.5, 1],
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </svg>
    </div>
  );
};
