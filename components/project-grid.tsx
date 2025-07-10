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
          className="cube sm:h-g10n h-[calc(2*var(--bg-grid-box-size)+2px)]"
          showClickAnimation={i == 0}
          frontContent={
            <div className="bg-fore h-full w-full">
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
            </div>
          }
          backContent={
            <Link href={`/work/${project.slug}`}>
              <div
                className={cn(
                  "bg-fore flex h-full w-full flex-col justify-center",
                )}
              >
                <p>
                  <span className="bg-fore text-back ml-[2px] font-mono">
                    {project.metadata["title"]}
                  </span>
                </p>
                <p>
                  <span className="bg-back text-fore text-[12px]">
                    {project.metadata["description"]}
                  </span>
                </p>
                {project.metadata["skills"] &&
                  project.metadata["skills"].length && (
                    <div className="mt-[2px] flex max-h-[44px] flex-wrap gap-[2px] overflow-hidden p-[4px]">
                      {project.metadata["skills"].map((skill) => (
                        <span
                          key={skill}
                          className="border-back text-back rounded-full border-1 px-[2px] text-[8px] leading-[10px]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
              </div>
            </Link>
          }
        />
      ))}
    </div>
  );
};
