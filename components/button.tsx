"use client";

// React
import { MouseEventHandler } from "react";

// Project
import { CursorSize } from "@/components/cursor";

export function Button({
  children,
  className = "",
  onClick = undefined,
  link = "",
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  link?: string;
}) {
  const classes = `font-sans font-thin bg-daybg dark:bg-night rounded-full border-2-fore-inside px-3 transition-all shadow-button hover:shadow-buttonhover -translate-y-[2px] hover:-translate-y-px cursor-none hover:cursor-none ${className}`;
  return (
    <CursorSize sizeOnHover={0.4}>
      {link ? (
        <a className={"inline-block " + classes} href={link} target="_blank">
          {children}
        </a>
      ) : (
        <button className={classes} onClick={onClick}>
          {children}
        </button>
      )}
    </CursorSize>
  );
}
