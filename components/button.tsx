"use client";

// Third-Party
import { CursorSize } from "@/components/cursor";
import { MouseEventHandler } from "react";

// Project

export function Button({
  children,
  className = "",
  onClick = undefined,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <CursorSize sizeOnHover={0.4}>
      <button
        className={`font-sans font-thin bg-daybg dark:bg-night rounded-full border-2-fore-inside px-3 transition-all shadow-button hover:shadow-buttonhover -translate-y-[2px] hover:-translate-y-[1px] cursor-none hover:cursor-none ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    </CursorSize>
  );
}
