import { Tag, TagProps } from "./tag";

type ClassNameSlot = "wrapper" | "main" | "tags";

export interface BlockProps {
  children: React.ReactNode;
  tags: TagProps[];
  classNames: { [key in ClassNameSlot]?: string };
}

export const Block: React.FC<BlockProps> = ({
  children,
  tags,
  classNames = {},
}) => {
  return (
    <div
      className={`bg-black ${classNames.wrapper || ""}`}
    >
      <div
        className={`bg-white border-2 border-black font-sans text-xl p-5 rounded-[40px] ${
          classNames.main || ""
        }`}
      >
        {children}
      </div>
      {tags.length && (
        <div className={`bg-black px-4 py-4 ${classNames.tags || ""}`}>
          {...tags.map((props, i) => <Tag {...props} key={i} />)}
        </div>
      )}
    </div>
  );
};
