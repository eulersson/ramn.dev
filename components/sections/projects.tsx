// React
import { ForwardedRef, forwardRef } from "react";

// Project
import { Title } from "@/components/title";
import { toBool } from "@/utils";

const Projects = forwardRef<HTMLHeadingElement>(function Projects({}, ref) {
  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[Projects] Rendering");
  }

  return (
    <section className="flex flex-col justify-center -mt-[2px] drill-mouse-hover">
      <Title ref={ref}>Projects</Title>
      <div className="h-[1002px] bg-back border-2-fore"></div>
    </section>
  );
});

export { Projects };
