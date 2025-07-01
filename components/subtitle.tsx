"use client";

import { motion } from "motion/react";

export function Subtitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      transition={{
        delay: 0.6,
        type: "spring",
      }}
      className="text-back text-center font-mono text-sm sm:text-lg"
    >
      <span className="bg-fore">{children}</span>
    </motion.h2>
  );
}
