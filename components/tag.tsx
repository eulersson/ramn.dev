export interface TagProps {
  text: string;
  dotted?: boolean;
}

export function Tag({
  text,
  dotted=false
}: TagProps) {
  return <span className="font-mono bg-white rounded-full border-inside px-2 py-1">{text}</span>;
}
