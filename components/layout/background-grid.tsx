// React
import { memo } from "react";

// Project
import { toBool } from "@/utils";

// Styles
import "./background-grid.css";

export const BackgroundGrid = memo(function BackgroundGrid() {
  const numBoxes = 100;

  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[BGGrid] Rendering");
  }

  return (
    <div className="bg-grid">
      <div className="bg-grid__screen-clipper border border-back">
        <div className="bg-grid__grid">
          <div className="bg-grid__grid-half bg-grid__grid-half--left">
            {[...Array(numBoxes)].map((e, i) => (
              <div className="bg-grid__box-bg bg-fore" key={i}>
                <div className="bg-grid__box bg-back border border-fore"></div>
              </div>
            ))}
          </div>
          <div className="bg-grid__grid-half bg-grid__grid-half--right">
            {[...Array(numBoxes)].map((e, i) => (
              <div className="bg-grid__box-bg bg-fore" key={i}>
                <div className="bg-grid__box bg-back border border-fore"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});
