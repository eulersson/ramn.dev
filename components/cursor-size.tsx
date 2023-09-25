import { FunctionComponent } from "react";

import { useCursor } from "@/contexts/cursor";

export const CursorSize: FunctionComponent<{
  className?: string;
  children: React.ReactNode;
  sizeOnHover: number;
}> = ({ className, children, sizeOnHover }) => {
  const { setCursorSize } = useCursor();
  return (
    <div
      className={className}
      onMouseEnter={() => setCursorSize(sizeOnHover)}
      onMouseLeave={() => setCursorSize(1)}
    >
      {children}
    </div>
  );
};
