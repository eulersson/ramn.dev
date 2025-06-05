import { toBool } from "@/utils";
import { CursorSize } from "./cursor";


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
    <CursorSize sizeOnHover={2}>
      <span
        className={`inline-block font-mono bg-back rounded-full px-2 py-1 select-none ${border ? "border-2" : ""
          }`}
      >
        <span className="hover:text-back hover:bg-fore">{text}</span>
      </span>

    </CursorSize>
  );
}
