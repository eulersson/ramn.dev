// React
import { useEffect, useState } from "react";

// Third-Party
import { motion } from "framer-motion";

export function Cover() {
  const [cross, setCross] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setCross(false);
    }, 500);
  });

  const drawCircles = {
    hidden: { scale: 0 },
    visible: (i: number) => {
      const delay = 0.1 * i;
      return {
        scale: 1,
        transition: {
          scale: { delay, type: "spring", siffness: 5, damping: 4 },
        },
      };
    },
  };

  const drawArrows = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => {
      const delay = 0.5 + 0.3 * i;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay, duration: 0.4 },
          opacity: { delay, duration: 0.01 },
        },
      };
    },
  };

  return (
    <>
      {cross && (
        <div
          key="cross"
          className="fixed w-full h-full bg-white border-2 border-black z-50"
        >
          <motion.div
            className="absolute w-[2px] bg-black top-0 left-[calc(50%-1px)]"
            initial={{ height: "0%" }}
            animate={{ height: "100%" }}
            transition={{ duration: 0.4, delay: 0 }}
          ></motion.div>
          <motion.div
            className="absolute h-[2px] bg-black top-[calc(50%-1px)] left-0"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.4, delay: 0.2 }}
          ></motion.div>
        </div>
      )}
      {!cross && (
        <motion.div
          key="cover-center"
          className="fixed w-[200px] h-[200px] -m-[98px] inset-1/2 bg-white z-40 border-2 border-black"
          initial={{ scale: 0 }}
          animate={{
            scale: 1,
            transition: { type: "spring", stiffness: 200, damping: 10 },
          }}
          exit={{
            scale: [1, 1.4, 0],
            transition: { delay: 0.7, duration: 0.4 },
          }}
        >
          <motion.svg
            width="200"
            height="200"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            viewBox="0 0 200 200"
            initial="hidden"
            animate="visible"
          >
            {/* Arrow Top */}
            <motion.line
              key="1a"
              variants={drawArrows}
              custom={0}
              x1="100"
              y1="100"
              x2="100"
              y2="46"
            />
            <motion.line
              key="1b"
              variants={drawArrows}
              custom={0.5}
              x1="100"
              y1="46"
              x2="110"
              y2="55"
            />
            <motion.line
              key="1c"
              variants={drawArrows}
              custom={0.5}
              x1="100"
              y1="46"
              x2="90"
              y2="55"
            />

            {/* Arrow Bottom-Left */}
            <motion.line
              key="2a"
              variants={drawArrows}
              custom={1}
              x1="100"
              y1="100"
              x2="50"
              y2="135"
            />
            <motion.line
              key="2b"
              variants={drawArrows}
              custom={1.5}
              x1="50"
              y1="135"
              x2="52"
              y2="122"
            />
            <motion.line
              key="2c"
              variants={drawArrows}
              custom={1.5}
              x1="50"
              y1="135"
              x2="63"
              y2="138"
            />

            {/* Arrow Bottom-Right */}
            <motion.line
              key="3a"
              variants={drawArrows}
              custom={2}
              x1="100"
              y1="100"
              x2="150"
              y2="135"
            />
            <motion.line
              key="3b"
              variants={drawArrows}
              custom={2.5}
              x1="150"
              y1="135"
              x2="150"
              y2="123"
            />
            <motion.line
              key="3c"
              variants={drawArrows}
              custom={2.5}
              x1="150"
              y1="135"
              x2="138"
              y2="138"
            />

            <motion.circle
              key="c1"
              variants={drawCircles}
              custom={0}
              cx="80"
              cy="90"
              r="7"
            />
            <motion.circle
              key="c2"
              variants={drawCircles}
              custom={1}
              cx="100"
              cy="122"
              r="7"
            />
            {/* Circles */}
            <motion.circle
              key="c3"
              variants={drawCircles}
              custom={2}
              cx="120"
              cy="90"
              r="7"
            />
          </motion.svg>
        </motion.div>
      )}

      {!cross &&
        [
          ["top-left", "left-0 top-0", "-100%", "-100%"],
          ["top-right", "top-0 right-0", "100%", "-100%"],
          ["bottom-left", "bottom-0 left-0", "-100%", "100%"],
          ["bottom-right", "bottom-0 right-0", "100%", "100%"],
        ].map(([name, classes, x, y, ease], i) => (
          <motion.div
            key={`cover-${name}`}
            className={`fixed ${classes} w-[calc(50%+1px)] h-[calc(50%+1px)] bg-white z-30 border-2 border-black`}
            initial={{ x: 0, y: 0 }}
            exit={{ x, y }}
            transition={{
              delay: 1,
              duration: 0.8,
              ease: "backOut"
            }}
          ></motion.div>
        ))}
    </>
  );
}
