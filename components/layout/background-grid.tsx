// Styles
import "./background-grid.css";

// Environment
import environment from "@/environment";

export function BackgroundGrid() {
  const numBoxes = 100;

  if (environment.printComponentRendering) {
    console.log("[BGGrid] Rendering");
  }

  return (
    <div className="bg-grid">
      <div className="bg-grid__screen-clipper">
        <div className="bg-grid__grid">
          <div className="bg-grid__grid-half bg-grid__grid-half--left">
            {[...Array(numBoxes)].map((e, i) => (
              <div className="bg-grid__box-bg" key={i}>
                <div className="bg-grid__box"></div>
              </div>
            ))}
          </div>
          <div className="bg-grid__grid-half bg-grid__grid-half--right">
            {[...Array(numBoxes)].map((e, i) => (
              <div className="bg-grid__box-bg" key={i}>
                <div className="bg-grid__box"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
