import { toBool } from "@/lib";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[BlogLayout] Rendering");
  }
  return <div className="bg-yellow-300">{children}</div>;
}
