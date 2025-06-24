import { toBool } from "@/lib";

export default function ProjectNotFound() {
  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[ProjectNotFound] Rendering");
  }
  return <h1>ProjectNotFound...</h1>;
}
