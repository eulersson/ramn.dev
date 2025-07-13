"use client";

// React
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// Next.js
import { useRouter } from "next/navigation";
import { cn } from "@/lib";
import { motion } from "motion/react";

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

  // TODO: This does it the right recommended way: using HTML dialog,
  // but for some reason then the custom cursor we have it shows below
  // and z-index get ignored.
  // const dialogRef = useRef<HTMLDialogElement>(null);
  // useEffect(() => {
  //   if (!dialogRef.current?.open) {
  //     dialogRef.current?.showModal();
  //   }
  // }, []);

  function onDismiss() {
    router.back();
  }

  // TODO: These would go on the dialog element, but as said in the comment
  // above it produces undesired effects.
  //
  // ref={dialogRef}
  // onClose={onDismiss}
  return createPortal(
    <div
      className={cn(
        "pointer-events-auto",
        "overflow-hidden",
        "h-full w-full",
        "fixed inset-0 z-70 bg-black/80",
        "group/modal is-open",
      )}
      onClick={() => onDismiss()}
    >
      <motion.dialog
        open
        id="modal-dialog"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
        className={cn(
          "border-2-fore bg-back pointer-events-auto overflow-scroll rounded rounded-xl",
          "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "max-w-[1200px]",
          "h-[80%] w-[calc(100%-20px)]",
          "sm:h-[calc(100%-60px)] sm:w-[calc(100%-60px)]",
          "sm:h-[calc(100%-150px)] sm:w-[calc(100%-150px)]",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.dialog>
    </div>,
    document.getElementById("modal-root")!,
  );
}
