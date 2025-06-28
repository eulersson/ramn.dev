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

  // TODO: This does it the right recommended way: using HTML dialog,
  // but for some reason then the custom cursor we have it shows below
  // and z-index get ignored.
  //
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
        "w-full h-full",
        "fixed bg-black/80 inset-0 z-70",
      )}
      onClick={() => onDismiss()}
    >
      <motion.dialog
        open
        className={cn(
          "pointer-events-auto rounded bg-white border-2-fore rounded-xl",
          "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "w-[calc(100%-60px)] h-[calc(100%-60px)]",
          "max-w-[1200px]",
          "sm:w-[calc(100%-150px)] sm:h-[calc(100%-150px)]",
          "overflow-scroll",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.dialog>
    </div>,
    document.getElementById("modal-root")!,
  );
}
