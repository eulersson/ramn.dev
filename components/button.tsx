"use client";

// React
import { MouseEventHandler } from "react";

// Project
import { CursorSize } from "@/components/cursor";
import { cn } from "@/lib";

export function Button({
  children,
  invert,
  className = "",
  onClick = undefined,
  link = "",
}: {
  children: React.ReactNode;
  className?: string;
  invert?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  link?: string;
}) {
  const classes = cn(
    `font-sans  font-thin rounded-full px-3 transition-all -translate-y-[2px] hover:-translate-y-px cursor-none hover:cursor-none`,
    invert
      ? `text-back bg-fore dark:bg-back dark:text-fore border-2-back-inside shadow-buttoninvert hover:shadow-buttonhoverinvert`
      : `text-fore bg-back dark:bg-back dark:text-fore border-2-fore-inside shadow-button hover:shadow-buttonhover`,
    className,
  );
  return (
    <CursorSize className="inline" sizeOnHover={0.4}>
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
