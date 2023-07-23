import { motion } from "framer-motion";
import { useSection } from "@/contexts/section";

import { useState } from "react";

export function Navbar() {
  const [section, setSection, sections, activeIdx] = useSection();

  return (
    <>
      {sections.map((s, i) => (
        <motion.div
          key={s}
          className="z-30 fixed h-full w-[30px] border-inside px-[2px] py-[8px]"
          layout
          initial={{
            left: i === 0 ? '-28px' : 'initial',
            right: i === 0 ? 'initial' : `-${28 * (sections.length - i)}px`,
            color: i === 0 ? "#ffffff" : "#000000",
            backgroundColor: i === 0 ? "#000000" : "#ffffff",
          }}
          animate={{
            left:
              i <= activeIdx ? `${28 * (i)}px` : "initial",
            right: i > activeIdx ? `${28 * (sections.length - i - 1)}px` : "initial",
            color: s === sections[activeIdx] ? "#ffffff" : "#000000",
            backgroundColor: s === sections[activeIdx] ? "#000000" : "#ffffff",
          }}
          transition={{ duration: 0.6 }}
          style={{
            writingMode: "vertical-lr",
          }}
          onClick={() => setSection(s)}
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
