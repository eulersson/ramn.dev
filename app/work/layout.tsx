import { LayoutContainer } from "@/app/page-wrapper";
import { cn } from "@/lib";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutContainer correctHeaderNavbarUpperSpace={false}>
      {children}
    </LayoutContainer>
  );
}
