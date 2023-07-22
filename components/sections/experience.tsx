import { Title } from "@/components/title";
import { forwardRef } from "react";

const Experience = forwardRef<HTMLElement>(function Experience(props, ref) {
  return (
    <section ref={ref} className="flex flex-col justify-center">
      <Title>Experience</Title>
      <div className="h-[1002px] bg-white border-2 border-black"></div>
    </section>
  );
});

export { Experience };
