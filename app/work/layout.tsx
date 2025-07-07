import { LayoutContainer } from "@/app/page-wrapper";
import { CoverWrapper } from "@/components/layout/cover-wrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <CoverWrapper renderPageAfter={0} clearClothAfter={3500}>
      <LayoutContainer correctHeaderNavbarUpperSpace={true}>
        {children}
      </LayoutContainer>
    </CoverWrapper>
  );
}
