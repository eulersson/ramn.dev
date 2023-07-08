import { AnimatePresence, motion } from "framer-motion";

export function Navbar({
  activeSection,
}: {
  activeSection: "home" | "about" | "experience" | "projects";
}) {
  const sections = ["home", "about", "experience", "projects"];
  const activeIdx = sections.findIndex((s) => s === activeSection);

  const variants = {
    active: {
      color: "#ffffff",
      backgroundColor: "#000000",
    },
    inactive: {
      color: "#000000",
      backgroundColor: "#ffffff",
    },
  };

  // TODO: Remove code duplication.
  return (
    <>
      <motion.div layoutScroll style={{ overflow: "scroll"}}>
        <nav className="fixed left-0 flex h-full z-30 --font-nunito">
          {sections
            .filter((s, i) => i <= activeIdx)
            .map((s, i) => (
              <motion.div key={i} layoutId={s} transition={{ duration: 2 }}>
                <motion.div
                  className="h-full py-2 px-1 -mr-[2px] border-inside border-black"
                  animate={s === sections[activeIdx] ? "active" : "inactive"}
                  variants={variants}
                  transition={{
                    color: {
                      duration: 0.5,
                      delay: 0.4,
                    },
                    backgroundColor: {
                      duration: 0.5,
                      delay: 0.4,
                    },
                  }}
                  style={{ writingMode: "vertical-rl" }}
                  key={s}
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
                <div
                  className={`${s === sections[activeIdx] ? "grow" : ""}`}
                ></div>
              </motion.div>
            ))}
        </nav>
        <nav className="fixed right-0 flex h-full z-30 --font-nunito">
          {sections
            .filter((s, i) => i > activeIdx)
            .map((s, i) => (
              <motion.div key={i} layoutId={s} transition={{ duration: 2 }}>
                <motion.div
                  className="h-full py-2 px-1 -mr-[2px] border-inside border-black"
                  animate={s === sections[activeIdx] ? "active" : "inactive"}
                  variants={variants}
                  style={{ writingMode: "vertical-rl" }}
                  key={s}
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
                <div
                  className={`${s === sections[activeIdx] ? "grow" : ""}`}
                ></div>
              </motion.div>
            ))}
        </nav></motion.div>
    </>
  );
}
