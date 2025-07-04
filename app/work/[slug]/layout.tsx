import { cn, toBool } from "@/lib";

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[ProjectLayout] Rendering");
  }
  return (
    <div
      className={cn(
        "bg-back border-2-fore -mt-ggpy pointer-events-auto",
        "max-xs:mt-g02n xs:max-sm:mt-g04n",
      )}
    >
      {children}
    </div>
  );
}
