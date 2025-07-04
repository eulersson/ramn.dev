import { LayoutContainer } from "@/app/page-wrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutContainer correctHeaderNavbarUpperSpace={true}>
      {children}
    </LayoutContainer>
  );
}
