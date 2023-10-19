import environment from "@/environment";

const pressingStart = environment.disableCover ? 2200 : 4200;
const pressingIntervalSize = 20;
const pressingDuration = 2500;
const pressingCycles = Math.floor(pressingDuration / pressingIntervalSize);

export const cursorAnimationConfig = {
  pressingStart,
  pressingIntervalSize,
  pressingDuration,
  pressingCycles,
  animate: {
    x: [400, 120, 120, 120, -240, 390, 200],
    y: [400, 210, 210, 210, 40, -230, 600],
    opacity: [1, 1, 1, 1, 1, 1, 0],
    scale: [1.2, 1.2, 0.8, 0.8, 0.8, 0.8, 0.8],
    rotateZ: [-88, -40, -40,-40, -40, -10, -10],
  },
  transition: {
    delay: environment.disableCover ? 1 : 3,
    duration: 4.5,
    times: [0, 0.227, 0.273, 0.4, 0.676, 0.823, 1],
    ease: [
      "easeInOut",
      "easeInOut",
      "easeInOut",
      "easeInOut",
      "easeInOut",
      "easeInOut",
      "easeInOut",
    ],
    transitionEnd: { display: "none" }
  },
};
