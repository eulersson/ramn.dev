"use client";

// React
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

// Next.js
import { cn } from "@/lib";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

// Third-Party
import { X, Maximize2, Minimize2 } from "lucide-react";
import { CursorSize } from "./cursor";

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

  // Maximize/minimize state
  const [maximized, setMaximized] = useState(false);

  // Modal size classes
  const modalSize = maximized
    ? "w-[98vw] h-[98vh]"
    : "w-[90vw] max-w-[700px] h-[80vh] max-h-[700px]";

  return createPortal(
    <div
      className={cn(
        "group/modal is-open fixed inset-0 z-70 flex items-center justify-center bg-black/80",
        "pointer-events-auto h-full w-full overflow-hidden",
      )}
      onClick={onDismiss}
    >
      <motion.div
        id="modal-dialog"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
        className={cn(
          "border-2-fore bg-back pointer-events-auto relative flex flex-col overflow-auto rounded-xl shadow-lg",
          modalSize,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Controls */}
        <div className="absolute top-1 z-10 z-70 flex w-full justify-center gap-2">
          <CursorSize sizeOnHover={0.4}>
            <button
              aria-label="Maximize or Minimize"
              onClick={() => setMaximized((m) => !m)}
              className="border-2-back hover:bg-back hover:text-fore text-back bg-fore hover:border-2-fore flex h-8 w-8 items-center justify-center rounded-full shadow transition"
              type="button"
            >
              {maximized ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>
          </CursorSize>
          <CursorSize sizeOnHover={0.4}>
            <button
              aria-label="Close"
              onClick={onDismiss}
              className="bg-fore border-2-back text-back hover:border-2-fore hover:bg-back hover:text-fore flex h-8 w-8 items-center justify-center rounded-full shadow transition"
              type="button"
            >
              <X size={18} />
            </button>
          </CursorSize>
        </div>
        {/* Modal Content */}
        <div className="h-full w-full flex-1 overflow-auto">{children}</div>
      </motion.div>
    </div>,
    document.getElementById("modal-root")!,
  );
}
