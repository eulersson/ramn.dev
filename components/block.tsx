import { Tag, TagProps } from "./tag";

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
  // console.log("[Block] Rendering")
  return (
    <div
      className={`bg-black ${classNames.wrapper || ""}`}
    >
      <div
        className={`bg-white border-2 border-black font-sans text-xl rounded-[40px] ${
          classNames.main || ""
        }`}
      >
        {children}
      </div>
      {tags && tags.length >= 1 && (
        <div className={`bg-black px-4 py-4 space-x-1 space-y-1 ${classNames.tags || ""}`}>
          {...tags.map((props, i) => <Tag {...props} key={i} />)}
        </div>
      )}
    </div>
  );
};
