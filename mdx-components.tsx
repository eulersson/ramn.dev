import type { MDXComponents } from "mdx/types";

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => (
      <h1 className="my-5 text-4xl font-serif">{children}</h1>
    ),
    p: ({ children }) => (
      <p className="my-5 text-lg font-sans">{children}</p>
    ),
    pre: ({ children }) => (
      <pre>{children}</pre>
    ),
    code: ({ children }) => (
      <code className="my-5 font-mono text-sm">{children}</code>
    ),
    ...components
  };
}
