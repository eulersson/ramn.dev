// Third-Party
import { ExternalLink } from "lucide-react";
import type { MDXComponents } from "mdx/types";

// Project
import { CursorSize } from "@/components/cursor";
import { ImageFlexRow } from "@/components/prose/image-flex-row";
import { cn } from "@/lib";

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ href, children }) => {
      return (
        <CursorSize className="inline" sizeOnHover={0.4}>
          <a
            className="text-fore/60 hover:text-fore/80 text-sm underline"
            href={href}
          >
            {children}
            <ExternalLink className="ml-1 inline h-3 w-3 text-gray-500" />
          </a>
        </CursorSize>
      );
    },
    blockquote: ({ children }) => (
      <blockquote
        className={cn(
          "text-fore/60 border-fore/80 bg-fore/10",
          "mx-10 my-5 border-l-1 p-10 py-4",
          "text-left text-lg italic",
        )}
      >
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="bg-fore/80 text-back rounded p-px text-sm">
        {children}
      </code>
    ),
    hr: () => <hr className="border-fore mx-[15%] my-2 border-t-1" />,
    img: (props) => (
      <CursorSize sizeOnHover={8}>
        <img {...props} />
      </CursorSize>
    ),
    li: (props) => (
      <li
        className="relative group-[ul]:pl-5 group-[ul]:before:absolute group-[ul]:before:left-0 group-[ul]:before:content-['◎']"
        {...props}
      />
    ),
    ol: ({ children }) => {
      return <ol className="group ml-9 list-decimal">{children}</ol>;
    },
    p: ({ children }) => (
      <p className={cn("py-1 text-justify hyphens-auto")}>{children}</p>
    ),
    pre: ({ children, className }) => (
      <pre
        className={cn(
          className,
          "bg-fore/80 pointer-events-auto my-2 overflow-x-scroll rounded p-5 selection:text-white",
        )}
      >
        {children}
      </pre>
    ),
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    ul: ({ children }) => <ul className="group ml-5 list-none">{children}</ul>,
    ImageFlexRow,
    ...components,
  };
}
