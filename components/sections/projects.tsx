// React
import { ForwardedRef, forwardRef } from "react";

// Project
import { Title } from "@/components/title";

const Projects = forwardRef<HTMLHeadingElement>(function Projects({}, ref) {

  console.log("[Projects] Rendering")

  return (
    <section className="flex flex-col justify-center -mt-[2px]">
      <Title ref={ref}>Projects</Title>
      <div className="h-[1002px] bg-white border-2 border-black"></div>
    </section>
  );
});

export { Projects };
