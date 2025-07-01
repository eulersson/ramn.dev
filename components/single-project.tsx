"use client";

// Next.js
import Image from "next/image";

// Project
import { Subtitle } from "@/components/subtitle";
import { Title } from "@/components/title";
import { cn } from "@/lib";
import { ProjectMetadata } from "@/types";

export const SingleProject = ({
  project,
  children,
}: {
  project: ProjectMetadata;
  children: React.ReactNode;
}) => (
  <article>
    <div className="relative w-full">
      <Image
        onLoad={(event) => {
          event.currentTarget.classList.remove("scale-0");
          event.currentTarget.classList.add("scale-100");
        }}
        className="transition-scale scale-0 object-cover duration-[2s]"
        src={project.heroImage}
        alt={project.title}
        fill
        priority
      />
      <div
        className={cn(
          "relative z-10",
          "border-fore flex flex-col items-center gap-5 border-b-2 py-10",
        )}
      >
        <Title>{project.title}</Title>
        <Subtitle>{project.description}</Subtitle>
      </div>
    </div>
    <div className="px-6 py-3 font-extralight dark:font-light">{children}</div>
  </article>
);
