// Third-Party
import { motion } from "framer-motion";

// Project
import { toBool } from "@/utils";
import { useSection } from "@/contexts/section";

export function Navbar() {
  const { setSection, sections, activeSectionIdx, navigationRunning } =
    useSection();

  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[Navbar] Rendering");
  }

  return (
    <>
      {sections.map((s, i) => (
        <motion.div
          key={s}
          className="z-20 fixed h-full w-[30px] border-2-fore-inside px-gppn py-[8px]"
          layout
          initial={{
            left: i === 0 ? "-28px" : "initial",
            right: i === 0 ? "initial" : `-${28 * (sections.length - i)}px`,
            color: i === 0 ? "var(--col-back)" : "var(--col-fore)",
            backgroundColor: i === 0 ? "var(--col-fore)" : "var(--col-back)",
          }}
          animate={{
            left: i <= activeSectionIdx ? `${28 * i}px` : "initial",
            right:
              i > activeSectionIdx
                ? `${28 * (sections.length - i - 1)}px`
                : "initial",
            color:
              s === sections[activeSectionIdx]
                ? "var(--col-back)"
                : "var(--col-fore)",
            backgroundColor:
              s === sections[activeSectionIdx]
                ? "var(--col-fore)"
                : "var(--col-back)",
          }}
          transition={{ duration: 0.6 }}
          style={{
            writingMode: "vertical-lr",
          }}
          onClick={() => {
            navigationRunning.current = true;
            setSection(s);
          }}
        >
          {[...Array(20)].map((e, j) => (
            <span
              className={`font-sans text-xl mb-2 select-none ${
                j === 0 ? "font-bold" : ""
              }`}
              key={j}
            >
              {s}
            </span>
          ))}
        </motion.div>
      ))}
    </>
  );
}
