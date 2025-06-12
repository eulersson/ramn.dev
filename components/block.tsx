// Project
import { Tag, TagProps } from "@/components/tag";
import { toBool } from "@/utils";

type ClassNameSlot = "wrapper" | "main" | "tags";

export function Block({
  children,
  tags,
  classNames = {},
}: {
  children: React.ReactNode;
  tags: TagProps[];
  classNames: { [key in ClassNameSlot]?: string };
}) {
  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[Block] Rendering");
  }

  return (
    <div className={`bg-fore border-2-fore ${classNames.wrapper || ""}`}>
      <div
        className={`bg-back font-sans rounded-[40px] hyphens-auto ${classNames.main || ""}`}
      >
        {children}
      </div>
      {tags && tags.length >= 1 && (
        // TODO: When the pills don't fit in the container with mouse, as you
        // move it left "scroll" the view leftwards and similarly rightwards.
        <div
          className={`bg-fore p-2 flex items-center justify-center gap-2 overflow-hidden ${
            classNames.tags || ""
          }`}
        >
          {...tags.map((props, i) => (
            <div key={i}>
              {" "}
              <Tag {...props} key={i} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
