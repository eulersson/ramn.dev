// React
import { ForwardedRef, forwardRef } from "react";

// Project
import { Title } from "@/components/title";

const Projects = forwardRef(function Projects({}, ref: ForwardedRef<HTMLElement>) {
  return (
    <section ref={ref} className="flex flex-col justify-center">
      <Title>Projects</Title>
      <div className="h-[1002px] bg-white border-2 border-black"></div>
    </section>
  );
})

export { Projects }