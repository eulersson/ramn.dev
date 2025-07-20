const logBeforeAfter = false;

export function parseMarkdown(
  md: string,
  title: string,
  owner: string,
  repo: string,
  branch: string,
): string {
  if (logBeforeAfter) {
    console.log("Before:", md);
  }

  // Convert relative image paths to absolute GitHub URLs
  md = md.replace(
    /!\[([^\]]*)\]\((?!http)(.*?)\)/g,
    (_, alt, path) =>
      `![${alt}](https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path})`,
  );

  // First, convert <img> tags with relative src to absolute GitHub URLs
  md = md.replace(
    /<img([^>]*?)src=["'](?!http)([^"'>]+)["']([^>]*?)>/g,
    (match, before, path, after) => {
      // Remove leading './', '/', or multiple slashes from the path
      const cleanPath = path.replace(/^\.?\/*/, "");
      return `<img${before}src=\"https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${cleanPath}\"${after}>`;
    },
  );

  // Then, convert style="..." attributes in <img> and <a> tags to React style={{...}}
  for (const tag of ["img", "a"]) {
    md = md.replace(
      new RegExp(`<${tag}([^>]*?)style=["']([^"']*)["']([^>]*?)>`, "g"),
      (match: string, before: string, styleString: string, after: string) => {
        // Convert CSS string to JS object string
        const styleObj = styleString
          .split(";")
          .filter(Boolean)
          .reduce((acc: string[], rule: string) => {
            const [key, value] = rule
              .split(":")
              .map((s: string) => s && s.trim());
            if (key && value) {
              // Convert kebab-case to camelCase
              const camelKey = key.replace(
                /-([a-z])/g,
                (_: string, c: string) => c.toUpperCase(),
              );
              acc.push(`${camelKey}: \"${value}\"`);
            }
            return acc;
          }, [] as string[]);
        return `<${tag}${before}style={{${styleObj.join(", ")}}}${after}>`;
      },
    );
  }

  // Remove the main project title heading that matches the slug
  const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  md = md.replace(new RegExp(`^# ${escapedTitle}\\s*\\n?`, "mi"), "");

  // Reduce one level for all headings starting from ## and deeper
  md = md.replace(/^(#{1,6})\s/gm, (match, hashes) => `${hashes.slice(1)} `);

  // Replace <picture> tags with ThemedImage component
  const resolvePath = (path: string) =>
    path.startsWith("http")
      ? path
      : `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path.replace(/^\.?\/*/, "")}`;

  // Replace <picture> blocks with ThemedImage only if they have a dark mode <source>
  md = md.replace(
    /<picture>\s*<source[^>]*media=["']\(prefers-color-scheme:\s*dark\)["'][^>]*srcset=["']([^"']+)["'][^>]*>\s*<img[^>]*alt=["']([^"']+)["'][^>]*src=["']([^"']+)["'][^>]*>\s*<\/picture>/gim,
    (_, darkSrc, alt, lightSrc) => {
      return `<ThemedImage className="mb-[4px]" alt="${alt}" lightSrc="${resolvePath(lightSrc)}" darkSrc="${resolvePath(darkSrc)}" />`;
    },
  );

  // Remove any HTML element with class="github-only" and its content
  md = md.replace(
    /<([a-zA-Z0-9]+)([^>]*\sclass=["']github-only["'][^>]*)>([\s\S]*?)<\/\1>/gim,
    "",
  );

  // Rewrite any Markdown links that contain 'wiki' in the URL to full GitHub wiki URLs
  md = md.replace(/\[([^\]]+)\]\(([^)]+wiki[^)]*)\)/g, (_, text, url) => {
    // Extract the path part after 'wiki', ignoring relative parts like ../../
    const wikiIndex = url.indexOf("wiki");
    const wikiPath = wikiIndex >= 0 ? url.slice(wikiIndex) : url;

    // Normalize path by removing leading slashes and dots
    const cleanPath = wikiPath.replace(/^\.?\/+/, "");

    return `[${text}](https://github.com/${owner}/${repo}/${cleanPath})`;
  });

  if (logBeforeAfter) {
    console.log("After:", md);
  }

  return md;
}
