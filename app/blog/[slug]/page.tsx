// Node.js
import fs from "fs";
import path from "path";

// Next.js
import dynamic from "next/dynamic";

// Project
import { toBool } from "@/utils";

const blogPath = path.join(process.cwd(), "content", "articles");

export const dynamicParams = false;

export function generateStaticParams() {
  const projects = fs.readdirSync(blogPath);
  return projects.map((name) => ({ slug: name.replace(".mdx", "") }));
}

export default async function ArticlePage(
  props: {
    params: Promise<{ slug: string }>;
  }
) {
  const params = await props.params;
  const { slug } = params;

  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[BlogPage] Rendering app/blog/[slug]/page.ts", slug);
  }
  const Blog = dynamic(() => import(`@/content/articles/${slug}.mdx`));
  return (
    <section>
      <h1>Slug: {slug}</h1>
      <Blog />
    </section>
  );
}
