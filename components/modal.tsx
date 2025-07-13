"use client";

// React
import { useEffect } from "react";
import { createPortal } from "react-dom";

// Next.js
import { cn } from "@/lib";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

/**
 * Modal component that renders its children inside a modal dialog using a portal.
 * The modal is displayed on mount and can be dismissed, which navigates back using the router.
 *
 * @see {@link https://github.com/vercel/nextgram}
 */
export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  // While the modal is open prevent scrolling the content underneath.
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <div
      className={cn(
        "pointer-events-auto",
        "overflow-hidden",
        "h-full w-full",
        "fixed inset-0 z-70 bg-black/80",
        "flex items-center justify-center",
        "group/modal is-open",
      )}
      onClick={() => onDismiss()}
    >
      <motion.div
        id="modal-dialog"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
        className={cn(
          "border-2-fore bg-back pointer-events-auto overflow-scroll rounded rounded-xl",
          "max-w-[1200px]",
          "h-[80%] w-[calc(100%-20px)]",
          "sm:h-[calc(100%-60px)] sm:w-[calc(100%-60px)]",
          "sm:h-[calc(100%-150px)] sm:w-[calc(100%-150px)]",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </div>,
    document.getElementById("modal-root")!,
  );
}
