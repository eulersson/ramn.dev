import { cn } from "@/lib";

export default function Loading() {
  <div
    className={cn(
      "pointer-events-auto",
      "h-full w-full",
      "fixed inset-0 z-70 bg-blue-500/80 text-[100px] text-yellow-500",
    )}
  >
    HOLA HOLA HOLA HOLA
  </div>;
}
