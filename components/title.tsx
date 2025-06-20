// React
import { motion } from "motion/react";
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
    <div className="m-auto">
      <CursorSize sizeOnHover={8}>
        <motion.h1
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{
            delay: 0.3,
            type: "spring",
          }}
          ref={ref}
          className={
            `italic font-serif font-normal leading-none bg-back border-2-fore-inside shadow-blocky ` +
            `text-[calc(var(--title-tag-size))] ` +
            `p-[calc(var(--title-tag-padding))] ` +
            className
          }
        >
          {children}
        </motion.h1>
      </CursorSize>
    </div>
  );
});

export { Title };
