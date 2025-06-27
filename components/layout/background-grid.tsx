"use client";

// Third-Party
import { memo, useState } from "react";

// Project
import { toBool } from "@/lib";

// Styles
import { useBreakpoint, useBreakpointChange } from "@/hooks/breakpoint";
import "./background-grid.css";

export const BackgroundGrid = memo(function BackgroundGrid() {
  const debugGrid = toBool(process.env.NEXT_PUBLIC_DEBUG_GRID);

  const [numBoxes, setNumBoxes] = useState(128);

  const bpXs = useBreakpoint("xs");

  useBreakpointChange((bp) => {
    switch (bp) {
      case "2xl": {
        setNumBoxes(112);
        break;
      }
      case "xl": {
        setNumBoxes(112);
        break;
      }
      case "lg": {
        setNumBoxes(120);
        break;
      }
      case "md": {
        setNumBoxes(132);
        break;
      }
      case "sm": {
        setNumBoxes(140);
        break;
      }
      case "xs": {
        setNumBoxes(192);
        break;
      }
    }

    if (bpXs.isSmaller) {
      setNumBoxes(332);
    }
  });

  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[BGGrid] Rendering");
  }

  return (
    <div className="w-full flex">
      {/* Left half */}
      <div
        className={`plate-grid ml-px justify-end ${
          debugGrid ? "bg-red-500" : "bg-fore"
        }`}
      >
        {[...Array(numBoxes)].map((_, i) => (
          <div className="plate-grid--item bg-back" key={i}>
            {debugGrid && (
              <div className="w-[4px] h-[2px] mt-[calc((var(--bg-grid-box-size)/2)+1px)] -translate-[2px] bg-red-500"></div>
            )}
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
          <div className="plate-grid--item bg-back" key={i}>
            {debugGrid && (
              <div className="w-[4px] h-[2px] mt-[calc((var(--bg-grid-box-size)/2)+1px)] -translate-[2px] bg-red-500"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
});
