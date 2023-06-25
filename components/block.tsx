import { Tag, TagProps } from "./tag";

type ClassNameSlot = "main" | "tags";

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
    <div className="bg-white outline border-inside">
      <div className={`font-sans text-xl p-5 ${classNames.main || ""}`}>
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