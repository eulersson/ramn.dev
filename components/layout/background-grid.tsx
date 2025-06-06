// Third-Party
import { memo } from "react";

// Project
import { toBool } from "@/utils";

// Styles
import "./background-grid.css";

export const BackgroundGrid = memo(function BackgroundGrid() {
  const numBoxes = 68;

  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[BGGrid] Rendering");
  }

  return (
    <div className="w-full flex">
      <div
        className={`plate-grid ml-px justify-end ${
          toBool(process.env.NEXT_PUBLIC_DEBUG_GRID) ? "bg-red-500" : "bg-fore"
        }`}
      >
        {[...Array(numBoxes)].map((e, i) => (
          <div className="plate-grid--item bg-back" key={i}></div>
        ))}
      </div>
      <div
        className={`plate-grid -ml-ggpn justify-start ${
          toBool(process.env.NEXT_PUBLIC_DEBUG_GRID) ? "bg-red-500" : "bg-fore"
        }`}
      >
        {[...Array(numBoxes)].map((e, i) => (
          <div className="plate-grid--item bg-back" key={i}></div>
        ))}
      </div>
    </div>
  );
});
