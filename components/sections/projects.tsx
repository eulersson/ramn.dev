// React
import { ForwardedRef, forwardRef } from "react";

// Project
import { Title } from "@/components/title";

// Environment
import environment from "@/environment";

const Projects = forwardRef<HTMLHeadingElement>(function Projects({}, ref) {
  if (environment.printComponentRendering) {
    console.log("[Projects] Rendering");
  }

  return (
    <section className="flex flex-col justify-center -mt-[2px] drill-mouse-hover">
      <Title ref={ref}>Projects</Title>
      <div className="h-[1002px] bg-white border-2 border-black"></div>
    </section>
  );
});

export { Projects };
