// Third-Party
import { forwardRef, useState, type ForwardedRef } from "react";

// Project
import { Title } from "@/components/title";
import { toBool } from "@/utils";
import { CarouselArrows } from "../layout/carousel-arrows";
import { CursorSize } from "../cursor";
import { motion } from "motion/react";


const Projects = forwardRef<HTMLHeadingElement>(function Projects({ }, ref: ForwardedRef<HTMLHeadingElement>) {
  const [page, setPage] = useState(0)

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
        <div className="relative h-full w-full border-2-fore flex">
          <CursorSize sizeOnHover={0.2}>
            <div
              className="absolute w-full h-[20px] -top-[21px] flex gap-1 items-center justify-center"
            >
              <motion.div
                className={`w-[15px] h-[15px] hover:w-[45px] hover:h-[45px] rounded-full border-2-fore `}
              ></motion.div>
            </div>
          </CursorSize>
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
