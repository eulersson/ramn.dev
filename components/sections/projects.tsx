// Third-Party
import { forwardRef, type ForwardedRef } from "react";

// Project
import { Title } from "@/components/title";
import { toBool } from "@/utils";
import { CarouselArrows } from "../layout/carousel-arrows";


const Projects = forwardRef<HTMLHeadingElement>(function Projects({ }, ref: ForwardedRef<HTMLHeadingElement>) {
  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[Projects] Rendering");
  }

  return (
    <section
      ref={ref}
      className="flex flex-col justify-center -mt-ggpn drill-mouse-hover"
    >
      <Title>Projects</Title>
      <div className="h-g20y mb-[22px] p-[20px] bg-back border-2-fore">
        <div className="h-full w-full border-2-fore flex">
          <CarouselArrows side="left" />
          <div className="grow">
            {/* TODO: Put the project summary contents here and create full routes for them. */}
          </div>
          <CarouselArrows side="right" />
        </div>
      </div>
    </section>
  );
});

export { Projects };
