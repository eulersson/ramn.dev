export interface TagProps {
  text: string;
  dotted?: boolean;
}

export function Tag({
  text,
  dotted=false
}: TagProps) {
  console.log("[Tag] Rendering")
  return <span className="inline-block font-mono bg-white rounded-full border-inside px-2 py-1 select-none">{text}</span>;
}
