import { AnimatePresence } from "motion/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AnimatePresence>{children}</AnimatePresence>;
}
