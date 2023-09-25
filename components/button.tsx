"use client";

import { useCursor } from "@/contexts/cursor";

export function Button({ children, className="" }: { children: React.ReactNode, className?: string }) {
  const {cursorSize, setCursorSize} = useCursor();

  return (
    <button
      className={`font-sans font-thin bg-daybg dark:bg-night rounded-full border-inside px-3 transition-all shadow-button hover:shadow-buttonhover -translate-y-[2px] hover:-translate-y-[1px] cursor-none hover:cursor-none ${className}`}
      onMouseEnter={() => setCursorSize(0.4)}
      onMouseLeave={() => setCursorSize(1)}
    >
      {children}
    </button>
  );
}
