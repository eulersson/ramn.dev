// Third-Party
import { motion } from "motion/react";
import { forwardRef } from "react";

// Project
import { Block } from "@/components/block";
import { CursorSize } from "@/components/cursor";
import { Recommendation } from "@/components/recommendation";
import ThemedImage from "@/components/themed-image";
import { Title } from "@/components/title";
import { cn } from "@/utils";

// Project - Content
import RecommendationPau from "@/content/recommendations/pau.mdx";
import RecommendationLorenzo from "@/content/recommendations/lorenzo.mdx";

const Recommendations = forwardRef<HTMLHeadingElement>(function About({}, ref) {
  return (
    <section className="flex flex-col justify-center" ref={ref}>
      <Title
        className={cn(
          // Upper spacing.
          "mt-[calc(0.5*var(--bg-grid-box-size)+2*var(--bg-grid-gap)-var(--title-tag-size)/2-var(--title-tag-padding))]",

          // Lower spacing.
          "mb-[calc(1*var(--bg-grid-box-size)-var(--title-tag-size)/2-var(--title-tag-padding))]",
        )}
      >
        Recommendations
      </Title>
      {/* First Review */}
      <div className="relative -mt-ggpn">
        <Block
          classNames={{
            wrapper: "h-g30y xs:g20y md:h-g10y",
            main: cn(
              "h-[calc(var(--bg-grid-box-size)*3+1*var(--bg-grid-gap))]",
              "md:h-g10n",
            ),
          }}
          tags={[]}
        >
          <div className="xs:grid xs:grid-cols-4 h-full">
            <div className="absolute origin-top-left left-6 top-1 w-full">
              <motion.span
                className="absolute top-0 left-0 font-title uppercase origin-top-left text-fore bg-back"
                initial={{ rotate: 90, y: 100 }}
                whileInView={{ y: -2 }}
                transition={{ delay: 0.25, duration: 0.5 }}
              >
                Pau Navarro
              </motion.span>
              <motion.span
                className="absolute top-0 -left-6 font-sans origin-top-left text-sm text-back bg-fore"
                initial={{ rotate: 90, y: -200 }}
                whileInView={{ y: -2 }}
                transition={{ delay: 0.25, duration: 0.5 }}
              >
                &nbsp;PM @ Watchity&nbsp;
              </motion.span>
            </div>
            <div
              className={cn(
                "bg-back dark:bg-fore xs:h-full ",
                "overflow-hidden sm:col-span-1 xs:max-md:h-full xs:max-md:flex xs:max-md:items-end",
                "w-[50px] h-[50px] xs:w-auto xs:h-auto mt-[0px] ml-[15px] xs:m-auto float-left",
              )}
            >
              <CursorSize sizeOnHover={8}>
                <ThemedImage
                  src="/pnavarro.png"
                  alt="Pau Navarro"
                  width={252}
                  height={252}
                />
              </CursorSize>
            </div>
            <div
              className={cn(
                "xs:col-span-3 px-5 py-3 xs:py-5 xs:flex xs:items-center",
                "text-[13px] sm:text-[16px] md:text-[14px] lg:text-[17px]",
              )}
            >
              <span
                className={cn(
                  "font-serif absolute",
                  "text-[60px] -top-[14px] left-[65px]",
                  "xs:text-[80px] xs:-top-[12px] xs:left-[130px]",
                  "sm:text-[90px] sm:top-[22px] sm:left-[170px]",
                  "md:text-[70px] md:-top-[5px] md:left-[210px]",
                  "lg:text-[80px] lg:-top-[10px] lg:left-[240px]",
                  "xl:text-[90px] xl:-top-[0px] xl:left-[260px]",
                )}
              >
                “
              </span>
              <RecommendationPau />
            </div>
          </div>
        </Block>
      </div>
      {/* Second Review */}
      <div className="relative -mt-ggpn">
        <Block
          classNames={{
            wrapper: "h-g30y xs:g20y md:h-g10y",
            main: cn(
              "h-[calc(var(--bg-grid-box-size)*3+1*var(--bg-grid-gap))]",
              "md:h-g10n",
            ),
          }}
          tags={[]}
        >
          <div className="xs:grid xs:grid-cols-4 h-full">
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
            <div
              className={cn(
                "xs:h-full xs:max-md:bg-fore",
                "overflow-hidden sm:col-span-1 sm:col-start-4 xs:max-md:h-full xs:max-md:flex xs:max-md:items-end",
                "w-[50px] h-[50px] xs:w-auto xs:h-auto mt-[0px] mr-[20px] ml-[5px]  xs:m-auto float-right",
              )}
            >
              <CursorSize sizeOnHover={8}>
                <ThemedImage
                  src="/langeli.png"
                  alt="Lorenzo Angeli"
                  width={252}
                  height={252}
                />
              </CursorSize>
            </div>
            <div
              className={cn(
                "xs:col-span-3 px-5 py-3 xs:py-5 xs:flex xs:items-center",
                "text-[13px] sm:text-[16px] md:text-[14px] lg:text-[17px]",
              )}
            >
              <span
                className={cn(
                  "font-serif absolute",
                  "text-[60px] -top-[14px] left-[24px]",
                  "xs:text-[80px] xs:-top-[18px] xs:left-[130px]",
                  "sm:text-[90px] sm:top-[8px] sm:left-[30px]",
                  "md:text-[70px] md:-top-[15px] md:left-[37.5px]",
                  "lg:text-[80px] lg:-top-[20px] lg:left-[37.5px]",
                  "xl:text-[90px] xl:-top-[0px] xl:left-[30px]",
                )}
              >
                “
              </span>
              <RecommendationLorenzo />
            </div>
          </div>
        </Block>
      </div>
    </section>
  );
});

export { Recommendations };
