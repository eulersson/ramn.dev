import environment from "@/environment";

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (environment.printComponentRendering) {
    console.log("[ProjectLayout] Rendering");
  }
  return <div className="bg-violet-300">{children}</div>;
}
