import environment from "@/environment";

export interface TagProps {
  text: string;
  dotted?: boolean;
}

export function Tag({ text, dotted = false }: TagProps) {
  if (environment.printComponentRendering) {
    console.log("[Tag] Rendering");
  }
  return (
    <span className="inline-block font-mono bg-back rounded-full border-inside px-2 py-1 select-none">
      {text}
    </span>
  );
}
