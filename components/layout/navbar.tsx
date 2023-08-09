// Third-Party
import { motion } from "framer-motion";

// Project
import { useSection } from "@/contexts/section";

export function Navbar() {
  const { setSection, sections, activeSectionIdx, navigationRunning } =
    useSection();

  console.log("[Navbar] Rendering");

  return (
    <>
      {sections.map((s, i) => (
        <motion.div
          key={s}
          className="z-20 fixed h-full w-[30px] border-inside px-[2px] py-[8px]"
          layout
          initial={{
            left: i === 0 ? "-28px" : "initial",
            right: i === 0 ? "initial" : `-${28 * (sections.length - i)}px`,
            color: i === 0 ? "#ffffff" : "#000000",
            backgroundColor: i === 0 ? "#000000" : "#ffffff",
          }}
          animate={{
            left: i <= activeSectionIdx ? `${28 * i}px` : "initial",
            right:
              i > activeSectionIdx
                ? `${28 * (sections.length - i - 1)}px`
                : "initial",
            color: s === sections[activeSectionIdx] ? "#ffffff" : "#000000",
            backgroundColor:
              s === sections[activeSectionIdx] ? "#000000" : "#ffffff",
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
