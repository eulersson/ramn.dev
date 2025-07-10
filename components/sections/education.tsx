// Third-Party
import { motion } from "motion/react";

// Project
import { cn } from "@/lib";

// Content
import education from "@/content/experience/education.json";

export function Education() {
  return (
    <div
      className={cn(
        "h-g70n mt-g10n mb-[16px] overflow-hidden",
        "xs:h-[calc(var(--spacing-g30n)+12px)] xs:-mb-[1px] xs:mt-[calc(var(--spacing-g10n)-3px)]",
        "sm:mt-[calc(var(--spacing-g10n)-3px)] sm:-mb-[12px] sm:h-[calc(var(--spacing-g20n)+19px)]",
        "md:mt-g10n md:mb-[5px] md:h-[calc(var(--height-g20y)-7px)]",
        "lg:mt-g10n lg:-mb-[2px] lg:h-[calc(var(--height-g20y))]",
        "lg:mt-g10n xl:-mb-[2px] xl:h-[calc(var(--height-g20y))]",
        "gap-x-ggpn grid grid-cols-2",
      )}
    >
      {education.map((item, i) => (
        <motion.div
          key={i}
          initial={{ x: i % 2 ? 150 : -150 }}
          whileInView={{ x: 0 }}
          transition={{ delay: i * 0.05 }}
          className={cn(
            i % 2
              ? "translate-y-[calc(var(--height-g02n)-2*var(--bg-grid-gap))] " +
                  "sm:translate-y-[calc(var(--height-g02n)-4*var(--bg-grid-gap))]" +
                  "md:translate-y-[calc(var(--height-g02n)+2*var(--bg-grid-gap))]" +
                  "lg:translate-y-[calc(var(--height-g02n)-2*var(--bg-grid-gap))]" +
                  "xl:translate-y-[calc(var(--height-g02n)-6*var(--bg-grid-gap))]" +
                  "xs:-ml-[10px] -ml-[12px] sm:-ml-[14px] md:-ml-[24px] lg:-ml-[36px]"
              : "xs:-mr-[10px] -mr-[12px] sm:-mr-[14px] md:-mr-[24px] lg:-mr-[36px]",
            i == 1 && "",
          )}
        >
          <span
            className={cn(
              "bg-fore text-back inline-block px-2 font-mono",
              "xs:text-[14px] text-[12px] md:text-[16px]",
              "align-bottom",
            )}
          >
            {item["school"]}
            <span className={cn("m-[2px] px-[1px]", "text-[8px]")}>
              {item["year"]}
            </span>
            {item["online"] && (
              <span
                className={cn(
                  "bg-back text-fore m-[2px] rounded px-[2px] text-[8px]",
                )}
              >
                online
              </span>
            )}
          </span>
          <p
            className={cn(
              "border-2-fore bg-back px-2",
              "xs:text-[14px] text-[14px] md:text-[16px]",
            )}
          >
            {item["title"]}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
