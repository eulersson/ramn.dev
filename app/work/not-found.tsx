import { toBool } from "@/utils";

export default function WorkNotFound() {
  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[WorkNotFound] Rendering");
  }
  return <h1>WorkNotFound...</h1>;
}
