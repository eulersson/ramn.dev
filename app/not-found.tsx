import { Logo } from "@/components/logo";
import { toBool } from "@/lib";
import Link from "next/link";

export default function RootNotFound() {
  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[RootNotFound] Rendering");
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Link href="/">
        <Logo className="max-xs:w-[50px]" logoUrl={"/question-mark.webp"} />
      </Link>
    </div>
  );
}
