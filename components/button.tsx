"use client";

// Project
import { CursorSize } from "./cursor-size";

export function Button({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <CursorSize sizeOnHover={0.4}>
      <button
        className={`font-sans font-thin bg-daybg dark:bg-night rounded-full border-inside px-3 transition-all shadow-button hover:shadow-buttonhover -translate-y-[2px] hover:-translate-y-[1px] cursor-none hover:cursor-none ${className}`}
      >
        {children}
      </button>
    </CursorSize>
  );
}
