"use client";

// React
import { useEffect, useState } from "react";

// Next.js
import Image from "next/image";
import Link from "next/link";

// Project
import { CubeFlip } from "@/components/cube-flip";
import { useBreakpoint } from "@/hooks/breakpoint";
import { cn } from "@/lib";
import { ProjectInfo } from "@/types";

export const ProjectGrid = ({ projects }: { projects: ProjectInfo[] }) => {
  const [cols, setCols] = useState(4);
  const bpSm = useBreakpoint("sm");
  const isSmallerThanSm = bpSm.isSmaller;
  useEffect(() => {
    setCols(isSmallerThanSm ? 2 : 4);
  }, [isSmallerThanSm]);

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
          column={i % cols}
          numColumns={cols}
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
