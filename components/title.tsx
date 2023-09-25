// React
import { forwardRef } from "react";

// Project
import { useCursor } from "@/contexts/cursor";

// Environment
import environment from "@/environment";

const Title = forwardRef<
  HTMLHeadingElement,
  {
    children: React.ReactNode;
    className?: string;
  }
>(function Title({ children, className = "" }, ref) {
  const {cursorSize, setCursorSize} = useCursor();

  if (environment.printComponentRendering) {
  console.log("[Title] Rendering")
  }

  return (
    <h1
      ref={ref}
      className={`italic inline m-auto mt-[calc((var(--bg-grid-box-size)-100px)/2)] mb-[calc((var(--bg-grid-box-size)-100px)/2)] font-serif font-normal leading-none text-[60px] p-[20px] bg-back border-inside shadow-blocky ${className}`}
      onMouseEnter={() => setCursorSize(4)}
      onMouseLeave={() => setCursorSize(1)}
    >
      {children}
    </h1>
  );
});

export { Title };
