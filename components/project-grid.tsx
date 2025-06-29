"use client";

// Next.js
import Image from "next/image";

// Project
import { CubeFlip } from "@/components/cube-flip";
import { cn } from "@/lib";
import { ProjectInfo } from "@/types";
import Link from "next/link";

export const ProjectGrid = ({ projects }: { projects: ProjectInfo[] }) => {
  return (
    <div
      className={cn(
        "pointer-events-auto",
        "grid grid-cols-2 sm:grid-cols-4 gap-ggpn border-2-fore bg-fore",
      )}
    >
      {projects.map((project, i) => (
        <CubeFlip
          key={i}
          className="h-[calc(2*var(--bg-grid-box-size)+2px)] sm:h-g10n"
          frontContent={
            <Image
              className="w-full h-full"
              src={project.metadata["heroImage"]}
              width={250}
              height={250}
              style={{ objectFit: "cover" }}
              alt={"dreamdrugs"}
            />
          }
          backContent={
            <Link href={`/work/${project.slug}`}>
              <div
                className={cn(
                  "w-full h-full flex flex-col justify-center bg-fore",
                )}
              >
                <p>
                  <span className="font-mono bg-fore text-back">
                    {project.metadata["title"]}
                  </span>
                </p>
                <p>
                  <span className="bg-back text-fore text-[12px]">
                    {project.metadata["description"]}
                  </span>
                </p>
              </div>
            </Link>
          }
        />
      ))}
    </div>
  );
};
