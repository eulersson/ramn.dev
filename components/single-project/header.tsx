"use client";

// Next.js
import Image from "next/image";

// Project
import { Subtitle } from "@/components/subtitle";
import { Title } from "@/components/title";
import { cn, toBool } from "@/lib";

export const SingleProjectHeader = ({
  title,
  subtitle,
  imageSrc,
}: {
  title: string;
  subtitle: string;
  imageSrc: string;
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
          event.currentTarget.classList.remove("scale-0");
          event.currentTarget.classList.add("scale-100");
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
          "border-fore flex flex-col items-center gap-5 border-b-2 py-10",
        )}
      >
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </div>
    </div>
  );
};
