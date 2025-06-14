// Third-Party
import { debug } from "debug";
import { motion, useInView, useMotionValue, useSpring } from "motion/react";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

// Project
import { Block } from "@/components/block";
import { CursorSize } from "@/components/cursor";
import { Tag } from "@/components/tag";
import ThemedImage from "@/components/themed-image";
import { Title } from "@/components/title";
import { toBool } from "@/utils";

// Project - Content
import jobEfestoLab from "@/content/experience/efesto-lab.json";
import jobMPC from "@/content/experience/mpc.json";
import jobNpaw from "@/content/experience/npaw.json";
import jobSecretStartup from "@/content/experience/secret-startup.json";
import jobWatchity from "@/content/experience/watchity.json";
import RecommendationLorenzo from "@/content/recommendations/lorenzo.mdx";
import RecommendationPau from "@/content/recommendations/pau.mdx";

// Loggers
const log = debug("experience");

type LogoRef = {
  spin: Function;
};

const Logo = forwardRef<LogoRef, { logoUrl: string }>(
  function Logo(props, ref) {
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

    useImperativeHandle(ref, () => {
      return {
        spin() {
          spinLogo();
        },
      };
    }, []);

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
  },
);

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

  const jobs = [jobWatchity, jobMPC, jobEfestoLab, jobNpaw, jobSecretStartup];
  const job = jobs[activeEmployer];

  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[Experience] Rendering");
  }

  return (
    <div ref={ref}>
      {/* --- Experience ----------------------------------------------------------- */}
      <section className="flex flex-col justify-center">
        <Title>Experience</Title>
        <div
          className={`grid p-ggpn grid-cols-4 gap-ggpn flex ${
            job["lengthy"] ? "h-g30y" : "h-20n"
          }`}
        >
          <div className="col-span-1 flex flex-col gap-ggpn">
            <CursorSize sizeOnHover={0.4}>
              <div className="border-x-0 h-g10t flex flex-col">
                {jobs.map((job, i) => (
                  <div
                    className={`grow font-mono green border-b-2 border-fore underline flex items-center justify-end px-2 ${
                      i === activeEmployer
                        ? "bg-fore text-back hover:font-extrabold"
                        : "bg-back text-fore hover:bg-fore hover:text-back"
                    } ${i === jobs.length - 1 ? "" : "border-b-2"}`}
                    key={i}
                    onClick={() => setActiveEmployerAnimated(i)}
                  >
                    <span className={`text-back bg-fore`}>
                      {job["company"]}
                    </span>
                  </div>
                ))}
              </div>
            </CursorSize>
            <Logo logoUrl={job["logo"]} ref={logoRef} />
          </div>

          <div className={`col-span-3 bg-back flex flex-col`}>
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
                <motion.li
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {p}
                </motion.li>
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
      <section className="flex flex-col justify-center">
        <Title>Recommendations</Title>
        <div className="p-ggpn relative">
          <Block
            classNames={{
              wrapper: "h-g10n",
              main: "h-g10n",
            }}
            tags={[]}
          >
            <div className="grid grid-cols-4 h-full">
              <div className="absolute origin-top-left left-6 top-1 w-full">
                <motion.span
                  className="absolute top-0 left-0 font-title uppercase origin-top-left text-fore bg-back"
                  initial={{ rotate: 90, y: 100 }}
                  whileInView={{ y: 0 }}
                  transition={{ delay: 0.25, duration: 0.5 }}
                >
                  Pau Navarro
                </motion.span>
                <motion.span
                  className="absolute top-0 -left-6 font-sans origin-top-left text-sm text-back bg-fore"
                  initial={{ rotate: 90, y: -200 }}
                  whileInView={{ y: 0 }}
                  transition={{ delay: 0.25, duration: 0.5 }}
                >
                  &nbsp;PM @ Watchity&nbsp;
                </motion.span>
              </div>
              <div className="bg-back dark:bg-fore h-full overflow-hidden col-span-1 flex items-center justify-center -mb-[20px]">
                <CursorSize sizeOnHover={4}>
                  <ThemedImage
                    src="/pnavarro.png"
                    alt="Pau Navarro"
                    width={252}
                    height={252}
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
        </div>
        <div>
          <div className="p-ggpn pt-0 mb-ggpn relative">
            <Block
              classNames={{
                wrapper: "h-g10n",
                main: "h-g10n",
              }}
              tags={[]}
            >
              <div className="grid grid-cols-4 h-full">
                <div className="absolute origin-top-right right-6 h-full w-full">
                  <motion.span
                    className="absolute top-0 right-0 font-title uppercase origin-top-right text-fore bg-back"
                    initial={{ rotate: -90, y: 100 }}
                    whileInView={{ y: 0 }}
                    transition={{ delay: 0.75, duration: 0.5 }}
                  >
                    &nbsp;Lorenzo Angeli&nbsp;
                  </motion.span>

                  <motion.span
                    className="absolute top-0 -right-6 font-sans origin-top-right text-sm text-back bg-fore"
                    initial={{ rotate: -90, y: -100 }}
                    whileInView={{ y: 0 }}
                    transition={{ delay: 0.75, duration: 0.5 }}
                  >
                    &nbsp;CEO @ Efesto Lab&nbsp;
                  </motion.span>
                </div>
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
                      width={252}
                      height={252}
                    />
                  </CursorSize>
                </div>
              </div>
            </Block>
          </div>
        </div>
      </section>
    </div>
  );
});

export { Experience };
