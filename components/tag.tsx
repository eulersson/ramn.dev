import { toBool } from "@/utils";

export interface TagProps {
  text: string;
  dotted?: boolean;
  border?: boolean;
}

export function Tag({ text, dotted = false, border = false }: TagProps) {
  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[Tag] Rendering");
  }
  return (
    <span
      className={`inline-block font-mono bg-back rounded-full px-2 py-1 select-none ${
        border ? "border-2" : ""
      }`}
    >
      {text}
    </span>
  );
}
