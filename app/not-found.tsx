import { toBool } from "@/lib";

export default function RootNotFound() {
  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[RootNotFound] Rendering");
  }
  return <h1>RootNotFound</h1>;
}
