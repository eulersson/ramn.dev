// React
import { FunctionComponent } from "react";

// Third-Party
import { motion } from "framer-motion";

export type Sentence = {
  text: string;
  className?: string;
};

export const Typewriter: FunctionComponent<{
  sentences: Sentence[];
  disableHighlight?: boolean;
  staggerChildren?: number;
  className?: string;
}> = ({
  sentences,
  disableHighlight = false,
  staggerChildren = 0.025,
  className,
}) => {
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

  console.log("[Typewriter] Rendering");
  return (
    <motion.div
      className={`${className} inline-block`}
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
            <>
              {c === "|" ? (
                <motion.br key={`${i}${j}linebreak`} variants={item} />
              ) : (
                <motion.span
                  className={s.className}
                  key={`${i}${j}`}
                  variants={item}
                >
                  {c}
                </motion.span>
              )}

              {j === s.text.length - 1 && i !== sentences.length - 1 ? (
                <motion.span key={`${i}${j}space`} variants={item}>
                  &nbsp;
                </motion.span>
              ) : (
                ""
              )}
            </>
          ));
        }),
      ]}
      {!disableHighlight && (
        <span className="bg-white mix-blend-difference -ml-[12px]">&nbsp;</span>
      )}
    </motion.div>
  );
};
