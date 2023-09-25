// React
import { forwardRef, useEffect, useRef, useState } from "react";

// Next.js
import Image from "next/image";

// Third-Party
import { useInView } from "framer-motion";

// Project
import { Sentence, Typewriter } from "@/components/typewriter";
import { Block } from "@/components/block";
import { TagProps } from "@/components/tag";
import { Terminal } from "@/components/terminal";
import { Title } from "@/components/title";
import { useCursor } from "@/contexts/cursor";

// Content
import Intention from "@/content/sections/intention.mdx";
import WhoAmI from "@/content/sections/whoami.mdx";

// Environment
import environment from "@/environment";
import { useTheme } from "next-themes";

const About = forwardRef<HTMLHeadingElement>(function About({}, ref) {
  const terminalRef = useRef<HTMLDivElement>(null);

  const [terminalState, setTerminalState] = useState<
    null | "loading" | "output"
  >(null);

  const terminalInView = useInView(terminalRef, { once: true });

  const spinnerChars = ["/", "-", "\\", "|"];
  const [spinnerCharIdx, setSpinnerCharIdx] = useState(0);
  const spinnerChar = spinnerChars[spinnerCharIdx];

  useEffect(() => {
    let timeout1: NodeJS.Timeout;
    let timeout2: NodeJS.Timeout;

    if (terminalInView) {
      timeout1 = setTimeout(() => setTerminalState("loading"), 1100);
      timeout2 = setTimeout(() => setTerminalState("output"), 3000);
    }
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [terminalInView]);

  const terminalSpinnerInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const clearSpinnerInterval = () => {
      if (terminalSpinnerInterval.current) {
        clearInterval(terminalSpinnerInterval.current);
      }
    };
    if (terminalState === "loading") {
      terminalSpinnerInterval.current = setInterval(() => {
        setSpinnerCharIdx((prev) => (prev >= 3 ? 0 : prev + 1));
      }, 100);
    } else {
      clearSpinnerInterval();
    }
    return () => {
      clearSpinnerInterval();
    };
  }, [terminalState]);

  const tags: TagProps[] = [
    { text: "Python", dotted: false },
    { text: "C++", dotted: false },
    { text: "JavaScript", dotted: false },
    { text: "Go", dotted: false },
    { text: "Django", dotted: false },
    { text: "Angular", dotted: false },
    { text: "React", dotted: false },
  ];

  const {cursorSize, setCursorSize} = useCursor();

  const sentences: Sentence[] = [
    {
      text: "Full Stack Software Engineer",
      className: "font-medium underline",
    },
    { text: "with" },
    { text: "computer graphics", className: "font-medium underline" },
    {
      text: "background and|VFX industry experience. I design, build and deploy scalable|interactive",
    },
    { text: "web apps,", className: "font-medium underline" },
    { text: "leveraging cloud computing when possible." },
  ];

  const { theme, setTheme } = useTheme();

  if (environment.printComponentRendering) {
    console.log("[About] Rendering");
  }

  return (
    <section className="flex flex-col justify-center drill-mouse-hover">
      <Title ref={ref}>Who Am I?</Title>
      <Terminal
        ref={terminalRef}
        disableHighlight={terminalState !== null}
        showCommand={terminalInView}
        className="m-g2 mt-0 h-g8 mb-g4"
        command="whoami"
      >
        {terminalState &&
          (terminalState === "loading" ? (
            <div className="flex">
              <span>{spinnerChar}</span>
            </div>
          ) : terminalState === "output" ? (
            <Typewriter sentences={sentences} />
          ) : (
            ""
          ))}
      </Terminal>
      <div className="relative grid grid-cols-4 drill-mouse-hover">
        <div className="drill-mouse-hover">
          {theme === "dark" ? (
            <Image
              onMouseEnter={() => setCursorSize(4)}
              onMouseLeave={() => setCursorSize(1)}
              className="absolute top-[-61px] left-[-108px] w-[366px]"
              src="/displaced-me-dark.png"
              width={707}
              height={685}
              alt="Displaced Me"
            />
          ) : (
            <Image
              onMouseEnter={() => setCursorSize(4)}
              onMouseLeave={() => setCursorSize(1)}
              className="absolute top-[-61px] left-[-108px] w-[366px]"
              src="/displaced-me.png"
              width={707}
              height={685}
              alt="Displaced Me"
            />
          )}
        </div>
        <div className="col-span-3">
          <Block
            classNames={{
              main: "h-g5 py-5 px-9 flex items-center justify-center",
              tags: "h-g3",
            }}
            tags={tags}
          >
            <Intention />
          </Block>
        </div>
      </div>
    </section>
  );
});

export { About };
