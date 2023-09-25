import { FunctionComponent } from "react";

import { useCursor } from "@/contexts/cursor";

export const CursorSize: FunctionComponent<{
  children: React.ReactNode;
  sizeOnHover?: number;
}> = ({ children, sizeOnHover = 0.4 }) => {
  const { setCursorSize } = useCursor();
  return (
    <div
      onMouseEnter={() => setCursorSize(sizeOnHover)}
      onMouseLeave={() => setCursorSize(1)}
    >
      {children}
    </div>
  );
};
