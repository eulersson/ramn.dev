// Third-Party
import { ExternalLink } from "lucide-react";
import type { MDXComponents } from "mdx/types";

// Project
import { CursorSize } from "@/components/cursor";
import MacBookShowcase from "@/components/mackbook-showcase";
import { Gallery } from "@/components/prose/gallery";
import { H1, H2, H3, H4, H5, H6 } from "@/components/prose/headings";
import { ThemedImage } from "@/components/prose/themed-image";
import { Video } from "@/components/video";
import { VideoEmbed } from "@/components/video-embed";
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
        <CursorSize className="inline-block" sizeOnHover={0.4}>
          <a
            className="text-fore/60 hover:text-fore/80 flex inline items-center text-sm underline"
            href={href}
          >
            {children}
            <ExternalLink
              width={9}
              height={9}
              className="ml-1 inline min-w-[9px] text-gray-500"
            />
          </a>
        </CursorSize>
      );
    },
    blockquote: ({ children }) => (
      <blockquote
        className={cn(
          "text-fore/60 border-fore/80 bg-fore/10",
          "my-5 border-l-1 p-5 py-4 sm:mx-10 sm:p-10",
          "text-left italic sm:text-lg",
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
    h1: ({ children }) => <H1>{children}</H1>,
    h2: ({ children }) => <H2>{children}</H2>,
    h3: ({ children }) => <H3>{children}</H3>,
    h4: ({ children }) => <H4>{children}</H4>,
    h5: ({ children }) => <H5>{children}</H5>,
    h6: ({ children }) => <H6>{children}</H6>,
    Hi: ({ children }) => <span className={`bg-[#ff0]`}>{children}</span>,
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
    ol: ({ children }) => (
      <ol className="group my-2 ml-9 list-decimal">{children}</ol>
    ),
    p: ({ children }) => (
      <p className={cn("py-1 text-justify hyphens-auto")}>{children}</p>
    ),
    pre: ({ children, className }) => (
      <div className="bg-fore/80 my-2 w-full overflow-auto rounded p-5">
        <pre className={cn(className, "selection:text-white")}>{children}</pre>
      </div>
    ),
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    table: ({ children }) => (
      <div className="w-full overflow-auto">
        <table className="border-fore m-auto my-3 border-collapse border text-left text-sm">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-fore/10 text-fore border-fore border-b">
        {children}
      </thead>
    ),
    tbody: ({ children }) => <tbody>{children}</tbody>,
    tr: ({ children }) => (
      <tr className="border-fore even:bg-fore/10 odd:bg-back border-b">
        {children}
      </tr>
    ),
    th: ({ children }) => (
      <th className="border-fore border px-4 py-2 font-semibold">{children}</th>
    ),
    td: ({ children }) => (
      <td className="border-fore border px-4 py-2">{children}</td>
    ),
    ul: ({ children }) => (
      <ul className="group my-2 ml-5 list-none">{children}</ul>
    ),
    CursorSize,
    Gallery,
    MacBookShowcase,
    ThemedImage,
    Video,
    VideoEmbed,
    ...components,
  };
}
