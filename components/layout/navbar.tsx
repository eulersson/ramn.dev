// Third-Party
import { motion } from "motion/react";

// Project
import { useSection } from "@/contexts/section";
import { toBool } from "@/utils";
import { useBreakpoint } from "@/hooks/breakpoint";
import settings from "@/config/settings";

export function Navbar() {
  const { setSection, sections, activeSectionIdx, navigationRunning } =
    useSection();

  const { isSmaller } = useBreakpoint(settings.navBarHorizontalAtBreakpoint);
  const vertical = isSmaller;

  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[Navbar] Rendering");
  }

  return (
    <>
      {sections.map((s, i) => {
        const initialExtra = vertical
          ? {
              bottom: i === 0 ? "initial" : `-${28 * (sections.length - i)}px`,
              top: i === 0 ? "-28px" : "initial",
              left: "initial",
              right: "initial",
            }
          : {
              left: i === 0 ? "-28px" : "initial",
              right: i === 0 ? "initial" : `-${28 * (sections.length - i)}px`,
              top: "initial",
              bottom: "initial",
            };

        const animateOrigin =
          i > activeSectionIdx
            ? `${28 * (sections.length - i - 1)}px`
            : "initial";

        const animateDestination =
          i <= activeSectionIdx ? `${28 * i}px` : "initial";

        const animateExtra = vertical
          ? {
              top: animateDestination,
              bottom: animateOrigin,
              left: 0,
              right: "initial",
            }
          : {
              left: animateDestination,
              right: animateOrigin,
              top: 0,
              bottom: "initial",
            };

        const extraClassNames = vertical
          ? "h-[30px] w-full py-gppn px-[8px]"
          : "w-[30px] h-full px-gppn px-[8px]";
        const style = vertical ? {} : { writingMode: "vertical-lr" as const };

        return (
          <motion.div
            key={s}
            className={`z-60 fixed border-2-fore-inside ${extraClassNames}`}
            layout
            initial={{
              color: i === 0 ? "var(--col-back)" : "var(--col-fore)",
              backgroundColor: i === 0 ? "var(--col-fore)" : "var(--col-back)",
              ...initialExtra,
            }}
            animate={{
              color:
                s === sections[activeSectionIdx]
                  ? "var(--col-back)"
                  : "var(--col-fore)",
              backgroundColor:
                s === sections[activeSectionIdx]
                  ? "var(--col-fore)"
                  : "var(--col-back)",
              ...animateExtra,
            }}
            transition={{ duration: 0.6 }} // make it no smaller than the setSection debounce amounts
            style={style}
            onClick={() => {
              navigationRunning.current = true;
              setSection(s);
            }}
          >
            {[...Array(20)].map((e, j) => (
              <span
                className={`font-sans text-xl select-none ${j === 0 ? "font-bold" : ""} ${vertical ? "mr-2" : "mb-2"}`}
                key={j}
              >
                {s}
              </span>
            ))}
          </motion.div>
        );
      })}
    </>
  );
}
