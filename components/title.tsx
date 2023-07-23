import { useCursor } from "@/contexts/cursor";

export function Title({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [cursorSize, setCursorSize] = useCursor();

  return (
    <h1
      className={`inline m-auto mt-[calc((var(--bg-grid-box-size)-100px)/2)] mb-[calc((var(--bg-grid-box-size)-100px)/2)] font-serif font-normal leading-none text-[60px] p-[19px] bg-white border-inside shadow-blocky ${className}`}
      onMouseEnter={() => setCursorSize(4)}
      onMouseLeave={() => setCursorSize(1)}
    >
      {children}
    </h1>
  );
}
