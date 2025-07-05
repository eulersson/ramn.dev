"use client";

import { cn } from "@/lib";
import { motion } from "motion/react";

export function Subtitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.h2
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      transition={{
        delay: 0.6,
        type: "spring",
      }}
      className={cn(
        "text-back text-center font-mono text-sm sm:text-lg",
        className,
      )}
    >
      <span className="bg-fore">{children}</span>
    </motion.h2>
  );
}
