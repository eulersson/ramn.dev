import { Title } from "@/components/title";
import { forwardRef } from "react";

const Experience = forwardRef<HTMLHeadingElement>(function Experience({}, ref) {
  return (
    <section className="flex flex-col justify-center">
      <Title ref={ref}>Experience</Title>
      <div className="h-[1002px] bg-white border-2 border-black"></div>
    </section>
  );
});

export { Experience };
