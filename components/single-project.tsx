import { ProjectMetadata } from "@/types";

export const SingleProject = ({
  project,
  children,
}: {
  project: ProjectMetadata;
  children: React.ReactNode;
}) => (
  <div>
    <h1>{JSON.stringify(project, null, 2)}</h1>
    <div>{children}</div>
  </div>
);
