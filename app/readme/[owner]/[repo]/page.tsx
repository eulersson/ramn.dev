"use client";

import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { useMDXComponents } from "@/mdx-components";

export default async function RepoReadmePage(props: {
  params: Promise<{ owner: string; repo: string }>;
}) {
  const { owner, repo } = await props.params; // ✅ Await the async params

  const branch = "main";
  const filePath = "README.md";
  const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filePath}`;

  let res: Response;
  try {
    res = await fetch(rawUrl, { cache: "no-store" });
  } catch {
    notFound();
  }

  if (!res.ok) notFound();

  let markdown = await res.text();

  // Convert relative image paths
  markdown = markdown.replace(
    /!\[([^\]]*)\]\((?!http)(.*?)\)/g,
    (_, alt, path) =>
      `![${alt}](https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path})`,
  );

  return (
    <div className="prose prose-invert mx-auto max-w-4xl px-4 py-10">
      <MDXRemote
        components={useMDXComponents({})}
        source={markdown}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
        }}
      />
    </div>
  );
}
