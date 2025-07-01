// React
import { forwardRef } from "react";

// Third-Party
import { Typewriter } from "./typewriter";

// Project
import { toBool } from "@/lib";

// TODO: Make interactive: allow moving, minimizing, closing, resizing.
export const Terminal = forwardRef<
  HTMLDivElement,
  {
    command: string;
    children: React.ReactNode;
    disableHighlight?: boolean;
    showCommand?: boolean;
    className?: string;
  }
>(function Terminal(
  {
    command,
    children,
    showCommand = true,
    disableHighlight = false,
    className = "",
  },
  ref,
) {
  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[Terminal] Rendering");
  }

  return (
    <div
      ref={ref}
      className={`border-2-fore shadow-blocky pointer-events-auto flex flex-col ${className}`}
    >
      <div className="bg-fore flex space-x-[10px] p-[10px]">
        {[...Array(3)].map((_, i) => (
          <div
            className="bg-back h-[17px] w-[17px] rounded-full transition-colors hover:bg-[#eee]"
            key={i}
          ></div>
        ))}
      </div>
      <div className={`bg-back grow p-5`}>
        <pre>
          ${" "}
          {showCommand && (
            <Typewriter
              className="inline"
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
