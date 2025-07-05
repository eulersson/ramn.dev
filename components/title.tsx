// React
import { forwardRef } from "react";

// Third-Party
import { motion } from "motion/react";

// Project
import { CursorSize } from "@/components/cursor";
import { cn, toBool } from "@/lib";

const Title = forwardRef<
  HTMLHeadingElement,
  {
    noAnim?: boolean;
    noDecoration?: boolean;
    children: React.ReactNode;
    className?: string;
  }
>(function Title({ noAnim, noDecoration, children, className = "" }, ref) {
  const h1Classes = cn(
    noDecoration
      ? ""
      : "bg-back border-2-fore-inside shadow-blocky p-[calc(var(--title-tag-padding))]",
    "pointer-events-auto",
    "font-serif text-[calc(var(--title-tag-size))] leading-none font-normal italic",
    className,
  );

  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[Title] Rendering");
  }

  return (
    <div className="m-auto">
      {noAnim ? (
        <h1 ref={ref} className={h1Classes}>
          {children}
        </h1>
      ) : (
        <CursorSize className="inline-block" sizeOnHover={8}>
          <motion.h1
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{
              delay: 0.3,
              type: "spring",
            }}
            ref={ref}
            className={h1Classes}
          >
            {children}
          </motion.h1>
        </CursorSize>
      )}
    </div>
  );
});

export { Title };
