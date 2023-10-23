// React
import { forwardRef } from "react";

// Third-Party
import { Typewriter } from "./typewriter";

// Project
import { toBool } from "@/utils";

// TODO: Make interactive: allow moving, minimizing, closing, resizing.
export const Terminal = forwardRef<
  HTMLDivElement,
  {
    command: string;
    children: React.ReactNode;
    disableHighlight?: boolean;
    showCommand?: boolean;
    className: string;
  }
>(function Terminal(
  {
    command,
    children,
    showCommand = true,
    disableHighlight = false,
    className,
  },
  ref
) {
  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[Terminal] Rendering");
  }

  return (
    <div
      ref={ref}
      className={`flex flex-col border-2-fore shadow-blocky ${className}`}
    >
      <div className="bg-fore p-[10px] flex space-x-[10px]">
        {[...Array(3)].map((_, i) => (
          <div
            className="w-[17px] h-[17px] bg-back hover:bg-[#eee] transition-colors rounded-full"
            key={i}
          ></div>
        ))}
      </div>
      <div className="grow bg-back p-5 text-xl">
        <pre>
          ${" "}
          {showCommand && (
            <Typewriter
              disableHighlight={disableHighlight}
              staggerChildren={0.15}
              sentences={[{ text: `${command} ` }]}
            />
          )}
        </pre>
        <div className="font-mono">{children}</div>
      </div>
    </div>
  );
});
