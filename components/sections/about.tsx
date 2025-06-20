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
import { cn, toBool } from "@/utils";

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
    { text: "React", dotted: false },
    { text: "Next.js", dotted: false },
    { text: "Angular", dotted: false },
    { text: "AWS", dotted: false },
    { text: "Kubernetes", dotted: false },
    { text: "OpenGL", dotted: false },
    { text: "VFX", dotted: false },
  ];

  const sentences: Sentence[] = [
    {
      text: "Full Stack Software Engineer",
      className: "font-medium underline",
    },
    { text: "with" },
    { text: "computer graphics", className: "font-medium underline" },
    {
      text: "background and VFX industry experience. I design, build and deploy scalable interactive",
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
      className={cn("flex flex-col justify-center", "md:mb-g04n")}
    >
      <Title
        className={cn(
          // Upper spacing.
          "mt-[calc(2*var(--bg-grid-box-size)+2*var(--bg-grid-gap)-var(--title-tag-size)/2-var(--title-tag-padding)-var(--header-height))]",
          "sm:mt-[calc(var(--bg-grid-box-size)+2*var(--bg-grid-gap)-var(--title-tag-size)/2-var(--title-tag-padding)-var(--header-height))]",

          // Lower spacing.
          "mb-[calc(0.5*var(--bg-grid-box-size)-var(--title-tag-size)/2-var(--title-tag-padding))]",
        )}
      >
        Who Am I?
      </Title>
      <div
        className={cn(
          "h-g70t xs:h-g30t sm:h-g20t lg:h-g10t",
          "mb-g04n",
          "p-g02n",
          "flex flex-col justify-center",
        )}
      >
        {/* Little terminal box that types a short summary what I do. */}
        <Terminal
          ref={terminalRef}
          disableHighlight={terminalState !== null}
          showCommand={terminalInView}
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
      </div>

      {/* A more technical overview of my work. */}
      <div className="relative grid grid-cols-4 gap-ggpn p-ggpn pb-0">
        <div
          className={cn(
            "col-span-4 sm:col-span-1 ",
            "flex flex-col justify-center",
            "h-g40t xs:h-g30t sm:h-auto",
          )}
        >
          <CursorSize sizeOnHover={8}>
            <ThemedImage
              className={cn(
                "scale-115 xs:scale-80 sm:scale-170 md:scale-150 lg:scale-150",
                "-translate-y-20 xs:-translate-y-16 sm:translate-y-0",
              )}
              src="/displaced-me.png"
              width={707}
              height={685}
              alt="Displaced Me"
            />
          </CursorSize>
        </div>

        <div className="col-span-4 sm:col-span-3">
          <Block
            classNames={{
              wrapper: cn("h-g50t xs:h-g30t md:h-g20t", "flex flex-col"),
              main: cn(
                "grow",
                "py-5 px-9",
                "text-md xs:text-lg xl:text-xl",
                "flex items-center justify-center",
              ),
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
