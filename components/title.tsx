// React
import { forwardRef } from "react";

// Project
import { CursorSize } from "@/components/cursor";
import { toBool } from "@/utils";

const Title = forwardRef<
  HTMLHeadingElement,
  {
    children: React.ReactNode;
    className?: string;
  }
>(function Title({ children, className = "" }, ref) {
  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[Title] Rendering");
  }

  return (
    <div className="m-auto mt-[calc((var(--bg-grid-box-size)-100px)/2)] mb-[calc((var(--bg-grid-box-size)-100px)/2)]">
      <CursorSize sizeOnHover={4}>
        <h1
          ref={ref}
          className={`italic font-serif font-normal leading-none text-[60px] p-[20px] bg-back border-inside shadow-blocky ${className}`}
        >
          {children}
        </h1>
      </CursorSize>
    </div>
  );
});

export { Title };
