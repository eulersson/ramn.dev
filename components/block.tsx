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
    <div className={`bg-fore ${classNames.wrapper || ""}`}>
      <div
        className={`bg-back font-sans text-xl rounded-[40px] ${
          classNames.main || ""
        }`}
      >
        {children}
      </div>
      {tags && tags.length >= 1 && (
        <div
          className={`bg-fore p-2 flex items-center justify-center gap-2 ${
            classNames.tags || ""
          }`}
        >
          {...tags.map((props, i) =><div key={i}> <Tag {...props} key={i} /></div>)}
        </div>
      )}
    </div>
  );
}
