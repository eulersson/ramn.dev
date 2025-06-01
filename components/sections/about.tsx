// Third-Party
import { useInView } from "motion/react";
import { forwardRef, useEffect, useRef, useState } from "react";

// Project
import { Block } from "@/components/block";
import { CursorSize } from "@/components/cursor";
import { TagProps } from "@/components/tag";
import { Terminal } from "@/components/terminal";
import { ThemedImage } from "@/components/themed-image";
import { Title } from "@/components/title";
import { Sentence, Typewriter } from "@/components/typewriter";
import { toBool } from "@/utils";

// Content
import Intention from "@/content/sections/intention.mdx";

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
    { text: "TypeScript", dotted: false },
    { text: "Go", dotted: false },
    { text: "Django", dotted: false },
    { text: "Angular", dotted: false },
    { text: "React", dotted: false },
    { text: "Next.js", dotted: false },
  ];

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

  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[About] Rendering");
  }

  return (
    <section
      ref={ref}
      className="flex flex-col justify-center drill-mouse-hover"
    >
      <Title>Who Am I?</Title>
      <Terminal
        ref={terminalRef}
        disableHighlight={terminalState !== null}
        showCommand={terminalInView}
        className="m-g02n mt-0 h-g10t mb-g04n"
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
      <div className="relative p-ggpn grid grid-cols-4 gap-ggpn drill-mouse-hover">
        <div className="drill-mouse-hover">
          <CursorSize sizeOnHover={4}>
            <ThemedImage
              className="absolute top-[-61px] left-[-108px] w-[366px]"
              src="/displaced-me.png"
              width={707}
              height={685}
              alt="Displaced Me"
            />
          </CursorSize>
        </div>
        <div className="col-span-3  bg-yellow-500">
          <Block
            classNames={{
              main: "h-g06n py-5 px-9 flex items-center justify-center",
              tags: "h-g02n",
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
