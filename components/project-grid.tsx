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
        "gap-ggpn border-2-fore bg-fore grid grid-cols-2 sm:grid-cols-4",
      )}
    >
      {projects.map((project, i) => (
        <CubeFlip
          key={i}
          column={i % cols}
          className="sm:h-g10n h-[calc(2*var(--bg-grid-box-size)+2px)]"
          frontContent={
            <Image
              className="transition-scale h-full w-full scale-0 object-cover duration-[2s]"
              src={project.metadata["heroImage"]}
              onLoad={(event) => {
                event.currentTarget.classList.remove("scale-0");
                event.currentTarget.classList.add("scale-100");
              }}
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
                  "bg-fore flex h-full w-full flex-col justify-center",
                )}
              >
                <p>
                  <span className="bg-fore text-back font-mono">
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
