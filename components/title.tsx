// React
import { forwardRef } from "react";

// Project
import { CursorSize } from "@/components/cursor-size";

// Environment
import environment from "@/environment";

const Title = forwardRef<
  HTMLHeadingElement,
  {
    children: React.ReactNode;
    className?: string;
  }
>(function Title({ children, className = "" }, ref) {
  if (environment.printComponentRendering) {
    console.log("[Title] Rendering");
  }

  return (
    <CursorSize className="flex" sizeOnHover={4}>
      <h1
        ref={ref}
        className={`italic inline m-auto mt-[calc((var(--bg-grid-box-size)-100px)/2)] mb-[calc((var(--bg-grid-box-size)-100px)/2)] font-serif font-normal leading-none text-[60px] p-[20px] bg-back border-inside shadow-blocky ${className}`}
      >
        {children}
      </h1>
    </CursorSize>
  );
});

export { Title };
