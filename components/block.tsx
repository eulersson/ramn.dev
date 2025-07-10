// React
import { useEffect, useRef } from "react";

// Third-Party
import { animate, useInView, useMotionValue } from "motion/react";

// Project
import { Tag, TagProps } from "@/components/tag";
import { cn, toBool } from "@/lib";

type ClassNameSlot = "wrapper" | "main" | "tags";

export function Block({
  children,
  tags,
  classNames = {},
}: {
  children: React.ReactNode;
  tags: TagProps[];
  classNames: { [key in ClassNameSlot]?: string };
}) {
  const tagsRef = useRef<HTMLDivElement>(null);
  const tagsInView = useInView(tagsRef);

  const scrollX = useMotionValue(0);

  // Update the element's scroll position as the motion value changes
  useEffect(() => {
    const unsubscribe = scrollX.on("change", (latest) => {
      if (tagsRef.current) {
        tagsRef.current.scrollLeft = latest;
      }
    });
    return unsubscribe;
  }, [scrollX]);

  useEffect(() => {
    if (tagsInView && tagsRef.current) {
      const maxScroll =
        tagsRef.current.scrollWidth - tagsRef.current.clientWidth;
      animate(scrollX, [0, maxScroll, 0], {
        duration: 1.5,
        repeat: 1,
        ease: "easeInOut",
      });
    }
  }, [tagsInView, scrollX]);

  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[Block] Rendering");
  }

  return (
    <div
      className={`bg-fore border-2-fore pointer-events-auto ${classNames.wrapper || ""}`}
    >
      <div
        className={cn(
          "bg-back min-h-0 rounded-[40px] font-sans text-ellipsis hyphens-auto",
          classNames.main,
        )}
      >
        {children}
      </div>
      {tags && tags.length >= 1 && (
        <div className="bg-fore p-ggpy">
          <div
            ref={tagsRef}
            className={cn(
              "gap-ggpy flex items-center justify-start",
              "hide-scrollbar overflow-x-auto",
              "hover:flex-wrap hover:justify-center",
              classNames.tags,
            )}
          >
            {...tags.map((props, i) => (
              <div key={i} className="shrink-0">
                <Tag {...props} key={i} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
