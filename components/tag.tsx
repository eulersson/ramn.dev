// Project
import { CursorSize } from "@/components/cursor";
import { toBool } from "@/lib";

export interface TagProps {
  text: string;
  border?: boolean;
}

export function Tag({ text, border = false }: TagProps) {
  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[Tag] Rendering");
  }

  return (
    <CursorSize sizeOnHover={2}>
      <span
        className={`inline-block font-mono bg-back rounded-full px-2 py-1 select-none ${
          border ? "border-2" : ""
        }`}
      >
        <span className="hover:text-back hover:bg-fore">{text}</span>
      </span>
    </CursorSize>
  );
}
