import { Spinner } from "@/components/layout/spinner";
import { cn } from "@/lib";

export default function Loading() {
  return (
    <div
      className={cn(
        "pointer-events-auto",
        "h-full w-full",
        "fixed inset-0 z-70 bg-black/80",
        "flex items-center justify-center",
      )}
    >
      <Spinner />
    </div>
  );
}
