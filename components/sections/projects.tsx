// Third-Party
import { forwardRef } from "react";

// Project
import { Title } from "@/components/title";
import { toBool } from "@/utils";

const Projects = forwardRef<HTMLHeadingElement>(function Projects({}, ref) {
  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[Projects] Rendering");
  }

  return (
    <section
      ref={ref}
      className="flex flex-col justify-center -mt-ggpn drill-mouse-hover"
    >
      <Title>Projects</Title>
      <div className="h-g40y bg-back border-2-fore"></div>
    </section>
  );
});

export { Projects };
