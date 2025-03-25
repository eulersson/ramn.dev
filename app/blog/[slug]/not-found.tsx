import { toBool } from "@/utils";

export default function ArticleNotFound() {
  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[ArticleNotFound] Rendering");
  }
  return <h1>ArticleNotFound...</h1>;
}
