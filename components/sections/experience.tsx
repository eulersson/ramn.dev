// Third-Party
import { forwardRef } from "react";

// Project
import { Career } from "@/components/sections/career";
import { Education } from "@/components/sections/education";
import { Recommendations } from "@/components/sections/recommendations";
import { Title } from "@/components/title";
import { cn, toBool } from "@/lib";

const Experience = forwardRef<HTMLHeadingElement>(function Experience({}, ref) {
  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[Experience] Rendering");
  }

  return (
    <div ref={ref}>
      <section className="flex flex-col justify-center md:mb-g04n">
        <Title
          className={cn(
            // Upper spacing
            "mt-[calc(var(--bg-grid-box-size)+2*var(--bg-grid-gap)-var(--title-tag-size)/2-var(--title-tag-padding))]",
            "md:mt-[calc(var(--bg-grid-box-size)/2+2*var(--bg-grid-gap)-var(--title-tag-size)/2-var(--title-tag-padding))]",

            // Lower spacing
            "mb-[calc(var(--bg-grid-box-size)-var(--title-tag-size)/2-var(--title-tag-padding))]",
          )}
        >
          Experience
        </Title>
        <Career />
        <Education />
        <Recommendations />
      </section>
    </div>
  );
});

export { Experience };
