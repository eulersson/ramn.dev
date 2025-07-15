import { Projects } from "@/components/sections/projects";
import { ThemeSwitch } from "@/components/theme-switch";
import { cn } from "@/lib";

export default function WorkPage() {
  return (
    <>
      <div
        className={cn(
          "pointer-events-auto absolute left-[calc(50%-35px)] z-40",
          "top-[calc(var(--header-height)+4px)]",
          "xs:top-[calc(var(--header-height)+12px)]",
          "sm:top-[calc(var(--header-height)+22px)]",
          "md:top-[calc(var(--header-height)+8px)]",
          "lg:top-[calc(var(--header-height)+26px)]",
          "xl:top-[calc(var(--header-height)+36px)]",
        )}
      >
        <ThemeSwitch yInitial={-100} />
      </div>
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
    </>
  );
}
