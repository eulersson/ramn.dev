import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

const SectionContext = createContext<
  [string, Dispatch<SetStateAction<string>>, string[], number] | null
>(null);

export function SectionProvider({ children }: { children: React.ReactNode }) {
  const sections = ["home", "about", "experience", "projects"];
  const [section, setSection] = useState("home");
  const activeSectionIdx = sections.findIndex((s) => s === section);
  return (
    <SectionContext.Provider
      value={[section, setSection, sections, activeSectionIdx]}
    >
      {children}
    </SectionContext.Provider>
  );
}

export function useSection() {
  return useContext(SectionContext);
}
