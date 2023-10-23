// Third-Party
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

// Project
import { Block } from "@/components/block";
import { CursorSize } from "@/components/cursor";
import { Tag } from "@/components/tag";
import ThemedImage from "@/components/themed-image";
import { Title } from "@/components/title";
import { toBool } from "@/utils";

// Project - Content
import RecommendationLorenzo from "@/content/recommendations/lorenzo.mdx";
import RecommendationPau from "@/content/recommendations/pau.mdx";
import jobEfestoLab from "@/content/experience/efestoLab.json";
import jobMPC from "@/content/experience/mpc.json";
import jobNpaw from "@/content/experience/npaw.json";
import jobWatchity from "@/content/experience/watchity.json";

type LogoRef = {
  spin: Function;
};

const Logo = forwardRef<LogoRef, { logoUrl: string }>(function Logo(
  props,
  ref
) {
  // Logo animations.
  const logoRef = useRef(null);
  const logoInView = useInView(logoRef);
  const logoRotateY = useMotionValue(0);
  const logoRotateYSpring = useSpring(logoRotateY, {
    mass: 3,
    stiffness: 100,
    damping: 8,
  });

  // Call this function every time you want the job's company logo to spin.
  const spinLogo = useCallback(() => {
    logoRotateY.set(logoRotateY.get() === 360 ? 0 : 360);
  }, []);

  useImperativeHandle(
    ref,
    () => {
      return {
        spin() {
          spinLogo();
        },
      };
    },
    []
  );

  // Spin the logo when it shows on screen.
  useEffect(() => {
    if (logoInView) {
      spinLogo();
    }
  }, [logoInView]);

  return (
    <CursorSize sizeOnHover={4}>
      <div
        className="min-h-[calc(var(--bg-grid-box-size)-2px)] flex flex-col items-center justify-center"
        ref={logoRef}
        onMouseEnter={() => {
          spinLogo();
        }}
        onMouseLeave={() => {
          spinLogo();
        }}
      >
        <motion.div style={{ rotateY: logoRotateYSpring }}>
          <ThemedImage
            src={props.logoUrl}
            alt="Watchity Logo"
            width={200}
            height={200}
          />
        </motion.div>
      </div>
    </CursorSize>
  );
});

// TODO: Break into separate components.
const Experience = forwardRef<HTMLHeadingElement>(function Experience({}, ref) {
  const logoRef = useRef<LogoRef>(null);

  // Sets the current job to read. When the job is changed spin the job's company logo.
  const [activeEmployer, setActiveEmployer] = useState(0);
  const setActiveEmployerAnimated = (i: number) => {
    setActiveEmployer(i);
    if (logoRef.current) {
      logoRef.current.spin();
    }
  };

  const jobs = [jobWatchity, jobMPC, jobEfestoLab, jobNpaw];
  const job = jobs[activeEmployer];
  const isBigJob = useMemo(
    () =>
      job.points.reduce((sum, curr) => {
        return sum + curr.length;
      }, 0) > 100,
    [job]
  );

  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[Experience] Rendering");
  }

  return (
    <>
      {/* --- Experience ----------------------------------------------------------- */}
      <section className="flex flex-col justify-center drill-mouse-hover">
        <Title ref={ref}>Experience</Title>
        <div
          className={`gap-[2px] p-[2px] pb-[0px] flex h-[calc(var(--bg-grid-box-size)*${
            isBigJob ? "3" : "2"
          })] drill-mouse-hover`}
        >
          <div className="min-w-[calc(var(--bg-grid-box-size)-2px)] flex flex-col gap-[2px] drill-mouse-hover">
            <CursorSize sizeOnHover={0.4}>
              <div className="min-h-[calc(var(--bg-grid-box-size)-2px)] flex flex-col">
                {jobs.map((job, i) => (
                  <div
                    className={`grow font-mono green border-fore underline flex items-center justify-end px-2 ${
                      i === activeEmployer
                        ? "bg-fore text-back hover:font-extrabold"
                        : "bg-back text-fore hover:bg-fore hover:text-back"
                    } ${i === jobs.length - 1 ? "" : "border-b-2"}`}
                    key={i}
                    onClick={() => setActiveEmployerAnimated(i)}
                  >
                    {job["company"]}
                  </div>
                ))}
              </div>
            </CursorSize>
            <Logo logoUrl={job["logo"]} ref={logoRef} />
          </div>

          <div
            className={`min-w-[calc(var(--bg-grid-box-size)*3-2px)] bg-back flex flex-col`}
          >
            <div className="font-mono text-center text-sm mt-3">
              {job["duration"]}
            </div>
            <div className="font-serif italic text-center text-4xl mb-3">
              {job["title"]}{" "}
              <span className="font-bold">
                @ {job["company"].replace("Moving Picture Company", "MPC")}
              </span>
            </div>
            <div className="h-[calc(var(--bg-grid-box-size)/6)] font-mono text-center text-lg text-back bg-fore py-2 my-2">
              {job["summary"]}
            </div>
            <ul className={`font-sans py-3 px/6) space-y-3 px-6 grow`}>
              {job["points"].map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
            <div
              className={`bg-fore px-4 py-4 flex-1 space-x-1 space-y-1 flex flex-wrap items-center justify-center`}
            >
              {...job["skills"].map((text, i) => <Tag key={i} text={text} />)}
            </div>
          </div>
        </div>
      </section>
      {/* --- Recommendations ------------------------------------------------------ */}
      <section className="flex flex-col justify-center drill-mouse-hover">
        <Title>Recommendations</Title>
        <div className="relative">
          <Block
            classNames={{
              wrapper: "h-[calc(var(--bg-grid-box-size)+2px)] -mt-[2px]",
              main: "h-[calc(var(--bg-grid-box-size)+2px)]",
            }}
            tags={[]}
          >
            <div className="grid grid-cols-4 h-full">
              <div className="bg-back dark:bg-fore overflow-hidden col-span-1 flex items-center justify-center -mb-[20px]">
                <CursorSize sizeOnHover={4}>
                  <ThemedImage
                    src="/pnavarro.png"
                    alt="Pau Navarro"
                    width={250}
                    height={250}
                  />
                </CursorSize>
              </div>
              <div className="col-span-3 p-5 text-lg flex items-center">
                <span className="font-serif text-[90px] absolute top-[45px] left-[260px]">
                  “
                </span>
                <RecommendationPau />
              </div>
            </div>
          </Block>
          <motion.div className="absolute text-back bg-fore dark:bg-back dark:text-fore dark:border-2-fore rounded-[40px] px-5 pb-1 -left-[60px] bottom-[40px] flex flex-col items-center">
            <p className="font-sans -mb-[5px]">Pau Navarro</p>
            <p className="font-sans text-xs">PM @ Watchity</p>
          </motion.div>
        </div>
        <div>
          <div className="relative">
            <Block
              classNames={{
                wrapper: "h-[calc(var(--bg-grid-box-size)+2px)] -mt-[2px]",
                main: "h-[calc(var(--bg-grid-box-size)+2px)]",
              }}
              tags={[]}
            >
              <div className="grid grid-cols-4 h-full">
                <div className="col-span-3 p-5 pl-10 text-lg flex items-center">
                  <span className="font-serif text-[90px] absolute top-[34px] left-[32px]">
                    “
                  </span>
                  <RecommendationLorenzo />
                </div>
                <div className="overflow-hidden col-span-1">
                  <CursorSize sizeOnHover={4}>
                    <ThemedImage
                      src="/langeli.png"
                      alt="Lorenzo Angeli"
                      width={250}
                      height={250}
                    />
                  </CursorSize>
                </div>
              </div>
            </Block>

            <motion.div className="absolute bg-back border-2-fore dark:border-none dark:bg-fore dark:text-back rounded-[40px] px-5 pb-1 -right-[100px] bottom-[40px] flex flex-col items-center">
              <p className="font-sans -mb-[5px]">Lorenzo Angeli</p>
              <p className="font-sans text-xs">CEO @ Efesto Lab</p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
});

export { Experience };
