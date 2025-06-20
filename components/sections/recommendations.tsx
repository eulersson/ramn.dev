// Third-Party
import { motion } from "motion/react";
import { forwardRef } from "react";

// Project
import { Block } from "@/components/block";
import { CursorSize } from "@/components/cursor";
import ThemedImage from "@/components/themed-image";
import { Title } from "@/components/title";
import { cn } from "@/utils";

// Project - Content
import RecommendationLorenzo from "@/content/recommendations/lorenzo.mdx";
import RecommendationPau from "@/content/recommendations/pau.mdx";

const Recommendations = forwardRef<HTMLHeadingElement>(function About({}, ref) {
  return (
    <section className="flex flex-col justify-center md:mb-g04n" ref={ref}>
      <Title
        className={cn(
          // Upper spacing.
          "mt-[calc(1*var(--bg-grid-box-size)+2*var(--bg-grid-gap)-var(--title-tag-size)/2-var(--title-tag-padding))]",
          "md:mt-[calc(0.5*var(--bg-grid-box-size)+2*var(--bg-grid-gap)-var(--title-tag-size)/2-var(--title-tag-padding))]",

          // Lower spacing.
          "mb-[calc(1*var(--bg-grid-box-size)-var(--title-tag-size)/2-var(--title-tag-padding))]",
        )}
      >
        Recommendations
      </Title>
      <div className="relative">
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
              <CursorSize sizeOnHover={8}>
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
                <CursorSize sizeOnHover={8}>
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
  );
});

export { Recommendations };
