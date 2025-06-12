// Third-Party
import { memo, useEffect, useState } from "react";

// Project
import { toBool } from "@/utils";

// Styles
import "./background-grid.css";
import { useBreakpoint } from "@/hooks/breakpoint";

export const BackgroundGrid = memo(function BackgroundGrid() {
  const debugGrid = toBool(process.env.NEXT_PUBLIC_DEBUG_GRID);

  const { isSmaller } = useBreakpoint("xs");
  const [numBoxes, setNumBoxes] = useState(68);

  useEffect(() => {
    if (isSmaller) {
      setNumBoxes(68 * 3);
    } else {
      setNumBoxes(68);
    }
  }, [isSmaller]);

  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[BGGrid] Rendering");
  }

  return (
    <div className="w-full flex">
      {/* Left half. */}
      <div
        className={`plate-grid ml-px justify-end ${
          debugGrid ? "bg-red-500" : "bg-fore"
        }`}
      >
        {[...Array(numBoxes)].map((e, i) => (
          <div className="plate-grid--item bg-back" key={i}>
            {debugGrid && (
              <div className="w-[4px] h-[2px] mt-[calc((var(--bg-grid-box-size)/2)+1px)] -translate-[2px] bg-red-500"></div>
            )}
          </div>
        ))}
      </div>
      {/* Right half. */}
      <div
        className={`plate-grid -ml-ggpn justify-start ${
          debugGrid ? "bg-red-500" : "bg-fore"
        }`}
      >
        {[...Array(numBoxes)].map((e, i) => (
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
