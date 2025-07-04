import { Projects } from "@/components/sections/projects";
import { cn } from "@/lib";

export default function WorkPage() {
  return (
    <div
      className={cn(
        "mt-[calc(2/8*var(--bg-grid-box-size)+1*var(--bg-grid-gap))]",
        "xs:mt-[calc(4/8*var(--bg-grid-box-size)+var(--bg-grid-gap))]",
        "sm:mt-[calc(4/8*var(--bg-grid-box-size))]",
        "md:-mt-ggpy",
        "lg:mt-[calc(1/8*var(--bg-grid-box-size)-var(--bg-grid-gap))]",
      )}
    >
      <Projects></Projects>
    </div>
  );
}
