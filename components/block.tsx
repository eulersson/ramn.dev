// Project
import { Tag, TagProps } from "@/components/tag";
import { toBool } from "@/utils";

type ClassNameSlot = "wrapper" | "main" | "tags";

export interface BlockProps {
  children: React.ReactNode;
  tags: TagProps[];
  classNames: { [key in ClassNameSlot]?: string };
}

export const Block: React.FunctionComponent<BlockProps> = ({
  children,
  tags,
  classNames = {},
}) => {
  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[Block] Rendering");
  }

  return (
    <div className={`bg-fore ${classNames.wrapper || ""}`}>
      <div
        className={`bg-back  border-2-fore font-sans text-xl rounded-[40px] ${
          classNames.main || ""
        }`}
      >
        {children}
      </div>
      {tags && tags.length >= 1 && (
        <div
          className={`bg-fore px-4 py-4 space-x-1 space-y-1 ${
            classNames.tags || ""
          }`}
        >
          {...tags.map((props, i) => <Tag {...props} key={i} />)}
        </div>
      )}
    </div>
  );
};
