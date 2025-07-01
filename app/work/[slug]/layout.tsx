import { toBool } from "@/lib";

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[ProjectLayout] Rendering");
  }
  return (
    <div className="bg-back border-2-fore -mt-ggpy pointer-events-auto">
      {children}
    </div>
  );
}
