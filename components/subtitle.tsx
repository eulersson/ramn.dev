"use client";

import { cn } from "@/lib";
import { motion } from "motion/react";

export function Subtitle({
  noAnim,
  children,
  className,
}: {
  noAnim?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  const h3Classes = cn(
    "text-back text-center font-mono text-sm sm:text-lg",
    className,
  );
  const spanClasses = "bg-fore";
  return noAnim ? (
    <h3 className={h3Classes}>
      <span className={spanClasses}>{children}</span>
    </h3>
  ) : (
    <motion.h3
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      transition={{
        delay: 0.6,
        type: "spring",
      }}
      className={h3Classes}
    >
      <span className={spanClasses}>{children}</span>
    </motion.h3>
  );
}
