import { FunctionComponent, ReactNode } from "react";

export const Recommendation: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  return <blockquote className="italic indent-8">{children}</blockquote>;
};
