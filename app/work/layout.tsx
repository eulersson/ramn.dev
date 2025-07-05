import { LayoutContainer } from "@/app/page-wrapper";
import { CoverWrapper } from "@/components/layout/cover-wrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <CoverWrapper>
      <LayoutContainer correctHeaderNavbarUpperSpace={true}>
        {children}
      </LayoutContainer>
    </CoverWrapper>
  );
}
