// Third-Party
import { ArrowDown } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

// Project
import { ThemedImage } from "@/components/themed-image";

// Project - Local
import { useMDXComponents } from "@/mdx-components";
import { toBool } from "@/lib";

export const SingleProjectBody = ({
  readmeMarkdown,
  children,
}: {
  readmeMarkdown?: string;
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
      {children}
      {readmeMarkdown && (
        <>
          <div className="bg-fore text-back my-5 flex justify-center gap-2 p-5">
            <ArrowDown />
            <ThemedImage
              src="/github.svg"
              alt="GitHub Logo"
              width={24}
              height={24}
              invert
            />
            <strong className="font-black">GitHub</strong> README.md
            <ArrowDown />
          </div>
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
