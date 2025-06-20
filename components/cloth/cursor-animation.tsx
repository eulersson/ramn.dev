import { toBool } from "@/utils";

const delayOffset = 2.0;
const pressingStart = toBool(process.env.NEXT_PUBLIC_DISABLE_COVER)
  ? delayOffset * 1000 + 900
  : delayOffset * 1000 + 2400;
const pressingIntervalSize = 20;
const pressingDuration = 4200;
const pressingCycles = Math.floor(pressingDuration / pressingIntervalSize);

export const cursorAnimationConfig = {
  delayOffset,
  pressingStart,
  pressingIntervalSize,
  pressingDuration,
  pressingCycles,
};
