"use client";

// Next.js
import Image from "next/image";

// Third-Party
import { motion } from "motion/react";

// Project
import { Subtitle } from "@/components/subtitle";
import { Title } from "@/components/title";
import { cn, toBool } from "@/lib";

export const SingleProjectHeader = ({
  title,
  subtitle,
  imageSrc,
  skills,
  delayAnimation = 0,
}: {
  title: string;
  subtitle: string;
  imageSrc: string;
  skills?: string[];
  delayAnimation: number;
}) => {
  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log(
      "[SingleProjectHeader] Rendering /components/single-project/header.tsx",
    );
  }

  return (
    <div className="relative w-full">
      <Image
        onLoad={(event) => {
          setTimeout(() => {
            event.currentTarget.classList.remove("scale-0");
            event.currentTarget.classList.add("scale-100");
          }, delayAnimation);
        }}
        className="transition-scale scale-0 object-cover duration-[2s]"
        src={imageSrc}
        alt={title}
        fill
        priority
      />
      <div
        className={cn(
          "relative z-10",
          "border-fore flex flex-col items-center gap-5 border-b-2 pt-10",
          skills && skills.length ? "" : "pb-10",
        )}
      >
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
        {skills && skills.length && (
          <motion.div
            className="align-center mb-5 flex flex-wrap justify-center gap-[6px]"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  delayChildren: 1,
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {skills.map((skill) => (
              <motion.span
                key={skill}
                variants={{
                  hidden: { opacity: 0, y: -10 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="bg-back border-fore text-fore rounded-full border-1 px-[4px] text-[12px]"
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};
