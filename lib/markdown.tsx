export function parseMarkdown(
  md: string,
  title: string,
  owner: string,
  repo: string,
  branch: string,
): string {
  // Convert relative image paths to absolute GitHub URLs
  md = md.replace(
    /!\[([^\]]*)\]\((?!http)(.*?)\)/g,
    (_, alt, path) =>
      `![${alt}](https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path})`,
  );
  // Also handle <img src="..."> tags with relative paths and convert style="..." to React style={{...}}
  md = md.replace(
    /<img([^>]*?)src=["'](?!http)([^"'>]+)["']([^>]*?)>/g,
    (match, before, path, after) => {
      // Extract style="..." if present
      const styleMatch = /style=["']([^"']*)["']/i.exec(before + after);
      let styleProp = "";
      if (styleMatch) {
        // Convert CSS string to JS object string
        const styleString = styleMatch[1];
        const styleObj = styleString
          .split(";")
          .filter(Boolean)
          .reduce((acc: string[], rule) => {
            const [key, value] = rule.split(":").map((s) => s && s.trim());
            if (key && value) {
              // Convert kebab-case to camelCase
              const camelKey = key.replace(/-([a-z])/g, (_, c) =>
                c.toUpperCase(),
              );
              acc.push(`${camelKey}: \"${value}\"`);
            }
            return acc;
          }, [] as string[]);
        styleProp = ` style={{${styleObj.join(", ")}}}`;
      }
      // Remove any style="..." from before/after
      const beforeClean = before.replace(/style=["'][^"']*["']/i, "");
      const afterClean = after.replace(/style=["'][^"']*["']/i, "");
      return `<img${beforeClean}src=\"https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}\"${styleProp}${afterClean}>`;
    },
  );

  // Remove the main project title heading that matches the slug
  md = md.replace(new RegExp(`^# ${title}$`, "mi"), "");

  // Reduce one level for all headings starting from ## and deeper
  md = md.replace(/^(#{1,6})\s/gm, (match, hashes) => `${hashes.slice(1)} `);

  // Replace <picture> tags with GitHubThemedImage component
  const resolvePath = (path: string) =>
    path.startsWith("http")
      ? path
      : `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path.replace(/^\.?\/*/, "")}`;

  md = md.replace(
    /<p[^>]*?>[\s\S]*?<picture>[\s\S]*?<source[^>]*?media=["']\(prefers-color-scheme:\s*dark\)["'][^>]*?srcset=["']([^"']+)["'][^>]*?>[\s\S]*?<img[^>]*?alt=["']([^"']+)["'][^>]*?src=["']([^"']+)["'][^>]*?>[\s\S]*?<\/picture>[\s\S]*?<\/p>/gim,
    (_, darkSrc, alt, lightSrc) => {
      return `<ThemedImage alt="${alt}" lightSrc="${resolvePath(lightSrc)}" darkSrc="${resolvePath(darkSrc)}" />`;
    },
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

  return md;
}

