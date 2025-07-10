// Third-Party
import { ArrowDown } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

// Project
import { ThemedImage } from "@/components/themed-image";

// Project - Local
import { cn, toBool } from "@/lib";
import { useMDXComponents } from "@/mdx-components";

export const SingleProjectBody = ({
  readmeMarkdown,
  repo,
  skills,
  children,
}: {
  readmeMarkdown?: string;
  repo?: string;
  skills?: string[];
  children: React.ReactNode;
}) => {
  const mdxComponents = useMDXComponents({});

  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log(
      "[SingleProjectBody] Rendering /components/single-project/body.tsx",
    );
  }
  return (
    <div className="px-6 py-3 font-extralight dark:font-light">
      {skills && skills.length && (
        <div className="align-center flex flex-wrap justify-center gap-[6px]">
          {skills.map((skill) => (
            <span
              key={skill}
              className="bg-fore text-back rounded-full px-[3px] text-[11px]"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
      {children}
      {readmeMarkdown && (
        <>
          <a
            href={`https://github.com/${repo}`}
            target="_blank"
            className={cn(
              "group bg-fore hover:border-2-fore hover:shadow-blocky border-2-back hover:bg-back hover:text-fore text-back",
              "my-5 flex justify-center gap-2 p-5",
            )}
          >
            <ArrowDown />
            <ThemedImage
              className="block group-hover:hidden"
              src="/github.svg"
              alt="GitHub Logo"
              width={24}
              height={24}
              invert
            />
            <ThemedImage
              className="hidden group-hover:block"
              src="/github.svg"
              alt="GitHub Logo"
              width={24}
              height={24}
            />
            <strong className="font-black">GitHub</strong> README.md
            <ArrowDown />
          </a>
          <MDXRemote
            source={readmeMarkdown}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
            }}
            components={mdxComponents}
          />
        </>
      )}
    </div>
  );
};
