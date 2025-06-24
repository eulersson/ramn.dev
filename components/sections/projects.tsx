// React
import { forwardRef, useRef, useState, type ForwardedRef } from "react";

// Third-Party
import { useInView } from "motion/react";

// Project
import { CursorSize } from "@/components/cursor";
import { Title } from "@/components/title";
import { cn, toBool } from "@/lib";

const Projects = forwardRef<HTMLHeadingElement>(function Projects(
  {},
  ref: ForwardedRef<HTMLHeadingElement>,
) {
  const [page, setPage] = useState(0);
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: false });

  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[Projects] Rendering");
  }

  return (
    <section ref={ref} className="flex flex-col justify-center -mt-ggpn">
      <Title
        ref={titleRef}
        className={cn(
          // Upper spacing.
          "mt-[calc(var(--bg-grid-box-size)+2*var(--bg-grid-gap)-var(--title-tag-size)/2-var(--title-tag-padding))]",
          "md:mt-[calc(var(--bg-grid-box-size)/2+2*var(--bg-grid-gap)-var(--title-tag-size)/2-var(--title-tag-padding))]",

          // Lower spacing.
          "mb-[calc(var(--bg-grid-box-size)-var(--title-tag-size)/2-var(--title-tag-padding))]",
        )}
      >
        Projects
      </Title>
      <div className="h-g20y mb-[22px] p-[20px] bg-back border-2-fore">
        <div className="relative h-full w-full border-2-fore flex">
          <CursorSize sizeOnHover={0.2}>
            <div className="absolute w-full h-[20px] -top-[21px] flex gap-1 items-center justify-center">
              <div
                className={`w-[45px] h-[45px] hover:w-[45px] hover:h-[45px] border-2-fore `}
              ></div>
            </div>
          </CursorSize>
          <div className="grow">
            {/* TODO: Put the project summary contents here and create full routes for them. */}
          </div>
        </div>
      </div>
    </section>
  );
});

export { Projects };
