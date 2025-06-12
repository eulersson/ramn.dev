// React
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";

// Project
import { ContextNotProvidedError } from "@/errors/context-not-provided";

const SectionContext = createContext<{
  section: string;
  setSection: Dispatch<SetStateAction<string>>;
  sections: string[];
  activeSectionIdx: number;
  navigationRunning: MutableRefObject<boolean>;
} | null>(null);

export function SectionProvider({ children }: { children: React.ReactNode }) {
  const sections = ["home", "about", "experience", "projects"];
  const [section, setSection] = useState("home");
  const activeSectionIdx = sections.findIndex((s) => s === section);
  const navigationRunning = useRef(false);

  return (
    <SectionContext.Provider
      value={{
        section,
        sections,
        setSection,
        activeSectionIdx,
        navigationRunning,
      }}
    >
      {children}
    </SectionContext.Provider>
  );
}

export function useSection() {
  const context = useContext(SectionContext);
  if (context === null) {
    throw new ContextNotProvidedError("SectionContext");
  }
  return context;
}
