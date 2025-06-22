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
            wrapper: "h-g40y xs:h-g30y sm:h-g20y md:h-g20y xl:h-g10y",
            main: cn(
              "h-[calc(4*var(--bg-grid-box-size)+3*var(--bg-grid-gap))]",
              "xs:h-[calc(3*var(--bg-grid-box-size)+2*var(--bg-grid-gap))]",
              "sm:h-[calc(2*var(--bg-grid-box-size)+1*var(--bg-grid-gap))]",
              "md:h-[calc(2*var(--bg-grid-box-size)+1*var(--bg-grid-gap))]",
              "xl:h-[calc(1*var(--bg-grid-box-size)+0*var(--bg-grid-gap))]",

              "rounded-tl-none",
            ),
          }}
          tags={[]}
        >
          <div className="xs:flex xs:items-center h-full">
            <div
              className={cn(
                "absolute h-full w-full pointer-events-none",

                "origin-top-left left-6 top-[4px]",
              )}
            >
              <motion.span
                className={cn(
                  "absolute top-0",
                  "text-[16px] xs:text-[25px]",
                  "font-title uppercase",
                  "text-fore bg-back",

                  "origin-top-left left-0 xs:left-[16px]",
                )}
                initial={{ rotate: 90, y: 100 }}
                whileInView={{ y: -2 }}
                transition={{ delay: 0.25, duration: 0.5 }}
              >
                &nbsp;Pau Navarro
              </motion.span>
              <motion.span
                className={cn(
                  "absolute top-0 font-sans text-[14px] text-back bg-fore",

                  "origin-top-left -left-6",
                )}
                initial={{ rotate: 90, y: -200 }}
                whileInView={{ y: -2 }}
                transition={{ delay: 0.25, duration: 0.5 }}
              >
                &nbsp;PM @ Watchity&nbsp;
              </motion.span>
            </div>
            <div
              className={cn(
                "xs:h-full",
                "xs:max-lg:flex-2",
                "overflow-hidden xs:max-md:h-full xs:max-md:flex xs:max-md:items-end",
                "w-[120px] h-[120px] xs:w-[160px] xs:h-[160px] sm:w-auto sm:h-auto",
                "mt-[0px] xs:max-md:m-auto",

                "bg-back",
                "md:self-stretch md:flex md:items-end",
                "float-left",

                "ml-[45px]",
                "dark:bg-fore",
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
                "xs:flex-3",
                "px-5 md:px-10 py-4 xs:py-5",
                "text-[14px] sm:text-[16px] md:text-[17px] lg:text-[17px]",
              )}
            >
              <span
                className={cn(
                  "font-serif absolute",
                  "text-[60px] -top-[14px] left-[140px]",
                  "xs:text-[80px] xs:top-[15px] xs:left-[195px]",
                  "sm:text-[60px] sm:top-[15px] sm:left-[265px]",
                  "md:text-[70px] md:top-[30px] md:left-[340px]",
                  "lg:text-[70px] lg:top-[85px] lg:left-[330px]",
                  "xl:text-[90px] xl:-top-[2px] xl:left-[330px]",
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
            wrapper: "h-g40y xs:h-g30y sm:h-g20y md:h-g20y xl:h-g10y",
            main: cn(
              "h-[calc(4*var(--bg-grid-box-size)+3*var(--bg-grid-gap))]",
              "xs:h-[calc(3*var(--bg-grid-box-size)+2*var(--bg-grid-gap))]",
              "sm:h-[calc(2*var(--bg-grid-box-size)+1*var(--bg-grid-gap))]",
              "md:h-[calc(2*var(--bg-grid-box-size)+1*var(--bg-grid-gap))]",
              "xl:h-[calc(1*var(--bg-grid-box-size)+0*var(--bg-grid-gap))]",
            ),
          }}
          tags={[]}
        >
          <div className="xs:flex xs:items-center h-full">
            <div
              className={cn(
                "absolute h-full w-full pointer-events-none",

                "origin-top-right right-6 top-[2px]",
              )}
            >
              <motion.span
                className={cn(
                  "absolute top-0 ",
                  "text-[16px] xs:text-[25px]",
                  "font-title uppercase",
                  "text-fore bg-back",

                  "origin-top-right right-0 xs:right-[16px]",
                )}
                initial={{ rotate: -90, y: 100 }}
                whileInView={{ y: 0 }}
                transition={{ delay: 0.75, duration: 0.5 }}
              >
                &nbsp;Lorenzo Angeli&nbsp;
              </motion.span>

              <motion.span
                className={cn(
                  "absolute top-0 font-sans text-[14px] text-back bg-fore",

                  "origin-top-right -right-6",
                )}
                initial={{ rotate: -90, y: -100 }}
                whileInView={{ y: 0 }}
                transition={{ delay: 0.75, duration: 0.5 }}
              >
                &nbsp;CEO @ Efesto Lab&nbsp;
              </motion.span>
            </div>
            <div
              className={cn(
                "xs:h-full",
                "xs:max-lg:flex-2",
                "overflow-hidden xs:max-md:h-full xs:max-md:flex xs:max-md:items-end",
                "w-[120px] h-[120px] xs:w-[160px] xs:h-[160px] sm:w-auto sm:h-auto",
                "mt-[0px] xs:max-md:m-auto",

                "bg-fore",
                "md:self-stretch md:flex md:items-end",
                "float-right",

                "mr-[20px] ml-[5px] md:mr-0",
                "xs:order-2",
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
                "xs:flex-3",
                "px-5 md:px-10 py-4 xs:py-5",
                "text-[14px] sm:text-[16px] md:text-[17px] lg:text-[17px]",

                "xs:order-1",
              )}
            >
              <span
                className={cn(
                  "font-serif absolute",
                  "text-[60px] -top-[14px] left-[26px]",
                  "xs:text-[80px] xs:top-[5px] xs:left-[15px]",
                  "sm:text-[60px] sm:top-[5px] sm:left-[20px]",
                  "md:text-[70px] md:top-[30px] md:left-[35px]",
                  "lg:text-[70px] lg:top-[80px] lg:left-[35px]",
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
