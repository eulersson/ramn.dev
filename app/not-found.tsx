import environment from "@/environment";

export default function RootNotFound() {
  if (environment.printComponentRendering) {
    console.log("[RootNotFound] Rendering");
  }
  return <h1>RootNotFound</h1>;
}
