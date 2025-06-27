"use client";

// Third-Party
import { memo, useRef, useState } from "react";
import { usePathname } from "next/navigation";

// Project
import { useBreakpoint, useBreakpointChange } from "@/hooks/breakpoint";
import { toBool } from "@/lib";

// Styles
import "./background-grid.css";

// Configuration for different routes
const GRID_CONFIG = {
  "/": {
    "2xl": 112,
    xl: 112,
    lg: 124,
    md: 132,
    sm: 140,
    xs: 192,
    xxs: 332,
  },
  "/work": {
    "2xl": 44,
    xl: 40,
    lg: 44,
    md: 44,
    sm: 48,
    xs: 48,
    xxs: 104,
  },
} as const;

const PLATE_GRID_ITEM_CLASSES =
  "bg-back transition-[border-radius] hover:rounded-[40px] duration-500 ease-in-out";

const DEBUG_CLASSES =
  "w-[4px] h-[2px] mt-[calc((var(--bg-grid-box-size)/2)+1px)] -translate-[2px] bg-red-500";

export const BackgroundGrid = memo(function BackgroundGrid() {
  const debugGrid = toBool(process.env.NEXT_PUBLIC_DEBUG_GRID);
  const bgGridRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [numBoxes, setNumBoxes] = useState(128);
  const bpXs = useBreakpoint("xs");

  useBreakpointChange((bp) => {
    const routeConfig =
      GRID_CONFIG[pathname as keyof typeof GRID_CONFIG] || GRID_CONFIG["/"];
    if (bpXs.isSmaller) {
      setNumBoxes(routeConfig["xxs"]);
    } else {
      const numBoxesForBreakpoint = routeConfig[bp as keyof typeof routeConfig];
      if (numBoxesForBreakpoint) {
        setNumBoxes(numBoxesForBreakpoint);
      }
    }
  });

  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[BGGrid] Rendering");
  }

  return (
    <div ref={bgGridRef} className="w-full flex">
      {/* Left half */}
      <div
        className={`plate-grid ml-px justify-end ${
          debugGrid ? "bg-red-500" : "bg-fore"
        }`}
      >
        {[...Array(numBoxes)].map((_, i) => (
          <div className={PLATE_GRID_ITEM_CLASSES} key={i}>
            {debugGrid && <div className={DEBUG_CLASSES}></div>}
          </div>
        ))}
      </div>
      {/* Right half */}
      <div
        className={`plate-grid -ml-ggpn justify-start ${
          debugGrid ? "bg-red-500" : "bg-fore"
        }`}
      >
        {[...Array(numBoxes)].map((_, i) => (
          <div className={PLATE_GRID_ITEM_CLASSES} key={i}>
            {debugGrid && <div className={DEBUG_CLASSES}></div>}
          </div>
        ))}
      </div>
    </div>
  );
});
