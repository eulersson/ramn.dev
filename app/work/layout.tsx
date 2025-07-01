import { LayoutContainer } from "@/app/page-wrapper";
import { cn } from "@/lib";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutContainer correctHeaderNavbarUpperSpace={false}>
      <div
        className={cn(
          "mt-[calc(2/8*var(--bg-grid-box-size)+1*var(--bg-grid-gap))]",
          "xs:mt-[calc(4/8*var(--bg-grid-box-size)+var(--bg-grid-gap))]",
          "sm:mt-[calc(4/8*var(--bg-grid-box-size))]",
          "md:-mt-ggpy",
          "lg:mt-[calc(1/8*var(--bg-grid-box-size)-var(--bg-grid-gap))]",
        )}
      >
        {children}
      </div>
    </LayoutContainer>
  );
}
