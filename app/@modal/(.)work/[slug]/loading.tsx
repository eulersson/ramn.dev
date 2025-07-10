"use client";

// Third-Party
import { motion } from "motion/react";

// Project
import { Spinner } from "@/components/layout/spinner";
import { cn } from "@/lib";

export default function Loading() {
  return (
    <motion.div
      key="spinner"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      className={cn(
        "pointer-events-auto",
        "h-full w-full",
        "fixed inset-0 z-70 bg-black/80",
        "flex items-center justify-center",
      )}
    >
      <Spinner />
    </motion.div>
  );
}
