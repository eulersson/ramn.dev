// Third-Party
import { motion } from "motion/react";

// Project
import { toBool } from "@/lib";

export type Sentence = {
  text: string;
  className?: string;
};

export function Typewriter({
  sentences,
  disableHighlight = false,
  staggerChildren = 0.025,
  textSize = "xl",
  className = "",
}: {
  sentences: Sentence[];
  disableHighlight?: boolean;
  staggerChildren?: number;
  textSize?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const container = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        duration: 0,
        staggerChildren,
      },
    },
  };

  const item = {
    hidden: {
      display: "none",
    },
    show: {
      display: "inline",
      transition: { duration: 0 },
    },
  };

  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[Typewriter] Rendering");
  }

  return (
    <motion.div
      className={`${className} flex flex-wrap text-${textSize}`}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {...[
        sentences.map((s, i) => {
          const stringCharacters = [];
          for (let i = 0; i < s.text.length; i++) {
            stringCharacters.push(s.text[i]);
          }

          return stringCharacters.map((c, j) => (
            <span
              key={`i${i}j${j}div`}
              className={`relative ${
                i === sentences.length - 1 && j === stringCharacters.length - 1
                  ? "text-back z-10"
                  : ""
              }`}
            >
              <motion.span
                className={`i${i}j${j} ${s.className || ""}`}
                key={`i${i}j${j}`}
                variants={item}
              >
                {/* Use non-breaking space instead of " " to avoid not being interpreted as such */}
                {c === " " ? "\u00A0" : c}
              </motion.span>
              {j === s.text.length - 1 && i !== sentences.length - 1 ? (
                <motion.span
                  className={`i${i}j${j}space relative`}
                  key={`i${i}j${j}space`}
                  variants={item}
                >
                  &nbsp;
                </motion.span>
              ) : (
                ""
              )}
            </span>
          ));
        }),
      ]}
      {/* {...[ */}
      {/*   sentences.map((s, i) => { */}
      {/*     const stringCharacters = []; */}
      {/*     for (let i = 0; i < s.text.length; i++) { */}
      {/*       stringCharacters.push(s.text[i]); */}
      {/*     } */}
      {/*     return stringCharacters.map((c, j) => ( */}
      {/*       <span */}
      {/*         key={`i${i}j${j}div`} */}
      {/*         className={`relative ${ */}
      {/*           i === sentences.length - 1 && j === stringCharacters.length - 1 */}
      {/*             ? "text-back z-10" */}
      {/*             : "" */}
      {/*         }`} */}
      {/*       > */}
      {/*         <motion.span */}
      {/*           className={`i${i}j${j} ${s.className || ""}`} */}
      {/*           key={`i${i}j${j}`} */}
      {/*           variants={item} */}
      {/*         > */}
      {/*           {c === " " ? "\u00A0" : c} */}
      {/*         </motion.span> */}
      {/*         {j === s.text.length - 1 && i !== sentences.length - 1 ? ( */}
      {/*           <motion.span */}
      {/*             className={`i${i}j${j}space relative`} */}
      {/*             key={`i${i}j${j}space`} */}
      {/*             variants={item} */}
      {/*           > */}
      {/*             &nbsp; */}
      {/*           </motion.span> */}
      {/*         ) : ( */}
      {/*           "" */}
      {/*         )} */}
      {/*       </span> */}
      {/*     )); */}
      {/*   }), */}
      {/* ]} */}
      {(!disableHighlight && (
        <span key={`dh`} className="bg-fore -left-[12px] relative">
          &nbsp;
        </span>
      )) ||
        ""}
    </motion.div>
  );
}
