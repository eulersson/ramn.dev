// Third-Party
import { motion } from "motion/react";
import { forwardRef } from "react";

// Project
import { Block } from "@/components/block";
import { CursorSize } from "@/components/cursor";
import ThemedImage from "@/components/themed-image";
import { Title } from "@/components/title";
import { cn } from "@/lib";

// Content
import RecommendationLorenzo from "@/content/recommendations/lorenzo.mdx";
import RecommendationPau from "@/content/recommendations/pau.mdx";

const Recommendations = forwardRef<HTMLHeadingElement>(function About({}, ref) {
  return (
    <section className="md:mt-g04n flex flex-col justify-center" ref={ref}>
      <Title
        className={cn(
          // Upper spacing
          "mt-[calc(var(--bg-grid-box-size)+2*var(--bg-grid-gap)-var(--title-tag-size)/2-var(--title-tag-padding))]",
          "md:mt-[calc(var(--bg-grid-box-size)/2+2*var(--bg-grid-gap)-var(--title-tag-size)/2-var(--title-tag-padding))]",

          // Lower spacing
          "mb-[calc(var(--bg-grid-box-size)-var(--title-tag-size)/2-var(--title-tag-padding))]",
        )}
      >
        Recommendations
      </Title>
      {/* First Review */}
      <div className="-mt-ggpn relative">
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
                "pointer-events-none absolute h-full w-full",

                "top-[4px] left-6 origin-top-left",
              )}
            >
              <motion.span
                className={cn(
                  "absolute top-0",
                  "xs:text-[23px] text-[14px]",
                  "font-title uppercase",
                  "text-fore bg-back",

                  "xs:left-[16px] left-0 origin-top-left",
                  "dark:text-back dark:bg-fore",
                )}
                initial={{ rotate: 90, y: 100 }}
                whileInView={{ y: -2 }}
                transition={{ delay: 0.25, duration: 0.5 }}
              >
                &nbsp;Pau Navarro
              </motion.span>
              <motion.span
                className={cn(
                  "text-back bg-fore absolute top-0 font-sans text-[14px]",

                  "-left-6 origin-top-left",
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
                "xs:max-md:h-full xs:max-md:flex xs:max-md:items-end overflow-hidden",
                "xs:w-[160px] xs:h-[160px] h-[120px] w-[120px] sm:h-auto sm:w-auto",
                "xs:max-md:m-auto mt-[0px]",

                "bg-back",
                "md:flex md:items-end md:self-stretch",
                "float-left",

                "dark:bg-fore",
              )}
            >
              <CursorSize sizeOnHover={8}>
                <ThemedImage
                  src="/pnavarro.webp"
                  alt="Pau Navarro"
                  width={252}
                  height={252}
                />
              </CursorSize>
            </div>
            <div
              className={cn(
                "xs:flex-3",
                "xs:py-5 px-5 py-4 md:px-10",
                "text-[14px] sm:text-[16px] md:text-[17px] lg:text-[17px]",
              )}
            >
              <span
                className={cn(
                  "absolute font-serif",
                  "-top-[14px] left-[125px] text-[60px]",
                  "xs:text-[80px] xs:top-[15px] xs:left-[195px]",
                  "sm:top-[15px] sm:left-[265px] sm:text-[60px]",
                  "md:top-[30px] md:left-[310px] md:text-[70px]",
                  "lg:top-[95px] lg:left-[290px] lg:text-[70px]",
                  "xl:-top-[2px] xl:left-[285px] xl:text-[90px]",
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
      <div className="-mt-ggpn relative">
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
                "pointer-events-none absolute h-full w-full",

                "top-[2px] right-6 origin-top-right",
              )}
            >
              <motion.span
                className={cn(
                  "absolute top-0",
                  "xs:text-[23px] text-[14px]",
                  "font-title uppercase",
                  "text-fore bg-back",

                  "xs:right-[16px] -right-[1px] origin-top-right",
                )}
                initial={{ rotate: -90, y: 100 }}
                whileInView={{ y: 0 }}
                transition={{ delay: 0.75, duration: 0.5 }}
              >
                &nbsp;Lorenzo Angeli&nbsp;
              </motion.span>

              <motion.span
                className={cn(
                  "text-back bg-fore absolute top-0 font-sans text-[14px]",

                  "-right-6 origin-top-right",
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
                "xs:max-md:h-full xs:max-md:flex xs:max-md:items-end overflow-hidden",
                "xs:w-[160px] xs:h-[160px] h-[120px] w-[120px] sm:h-auto sm:w-auto",
                "xs:max-md:m-auto mt-[0px]",

                "bg-fore",
                "md:flex md:items-end md:self-stretch",
                "float-right",

                "mr-[20px] ml-[5px] md:mr-0",
                "xs:order-2",
                "dark:bg-back",
              )}
            >
              <CursorSize sizeOnHover={8}>
                <ThemedImage
                  src="/langeli.webp"
                  alt="Lorenzo Angeli"
                  width={252}
                  height={252}
                />
              </CursorSize>
            </div>
            <div
              className={cn(
                "xs:flex-3",
                "xs:py-5 px-5 py-4 md:px-10",
                "text-[14px] sm:text-[16px] md:text-[17px] lg:text-[17px]",

                "xs:order-1",
              )}
            >
              <span
                className={cn(
                  "absolute font-serif",
                  "-top-[14px] left-[26px] text-[60px]",
                  "xs:text-[80px] xs:top-[5px] xs:left-[15px]",
                  "sm:top-[5px] sm:left-[20px] sm:text-[60px]",
                  "md:top-[30px] md:left-[35px] md:text-[70px]",
                  "lg:top-[80px] lg:left-[35px] lg:text-[70px]",
                  "xl:-top-[0px] xl:left-[30px] xl:text-[90px]",
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
