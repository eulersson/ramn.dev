import education from "@/content/experience/education.json";
import { cn } from "@/utils";

export function Education() {
  return (
    <div
      className={cn(
        "h-g70n mt-g10n mb-[16px]",
        "xs:h-[calc(var(--spacing-g30n)+12px)] xs:-mb-[1px] xs:mt-[calc(var(--spacing-g10n)-3px)]",
        "sm:h-[calc(var(--spacing-g20n)+14px)] sm:-mb-[5px] sm:mt-[calc(var(--spacing-g10n)-3px)]",
        "md:h-[calc(var(--height-g20y)-7px)] md:mb-[7px] md:mt-g10n",
        "lg:h-[calc(var(--height-g20y)+8px)] lg:-mb-[8px] lg:mt-g10n",
        "xl:h-g20y xl:mb-[0px] lg:mt-g10n",
        "grid grid-cols-2 gap-x-ggpn",
      )}
    >
      {education.map((item, i) => (
        <div
          className={cn(
            i % 2 &&
              "translate-y-[calc(var(--height-g02n)-var(--bg-grid-gap))] " +
                "sm:translate-y-[calc(var(--height-g02n)-3*var(--bg-grid-gap))] " +
                "md:translate-y-[calc(var(--height-g02n)+2*var(--bg-grid-gap))] " +
                "lg:translate-y-[calc(var(--height-g02n)-2*var(--bg-grid-gap))] " +
                "xl:translate-y-[calc(var(--height-g02n)-6*var(--bg-grid-gap))] ",
            i == 1 && "",
          )}
        >
          <span
            className={cn(
              "inline-block font-mono px-2 bg-fore text-back",
              "text-[12px] xs:text-[14px] md:text-[16px]",
              "align-bottom",
            )}
          >
            {item["school"]}
            <span className={cn("px-[1px] m-[2px]", "text-[8px]")}>
              {item["year"]}
            </span>
            {item["online"] && (
              <span
                className={cn(
                  "bg-back text-fore rounded text-[8px] px-[1px] m-[2px]",
                )}
              >
                online
              </span>
            )}
          </span>
          <p
            className={cn(
              "border-fore border-t-2 border-b-2 bg-back px-2",
              "text-[14px] xs:text-[14px] md:text-[16px]",
              i % 2 ? "border-r-2" : "border-l-2",
            )}
          >
            {item["title"]}
          </p>
        </div>
      ))}
    </div>
  );
}
