import { LayoutContainer } from "@/app/page-wrapper";
import { ThemeSwitch } from "@/components/theme-switch";
import { cn } from "@/lib";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutContainer correctHeaderNavbarUpperSpace={true}>
      <div
        className={cn(
          "absolute left-[calc(50%-35px)]",
          "top-[calc(var(--header-height)+4px)]",
          "xs:top-[calc(var(--header-height)+12px)]",
          "sm:top-[calc(var(--header-height)+22px)]",
          "md:top-[calc(var(--header-height)+8px)]",
          "lg:top-[calc(var(--header-height)+26px)]",
          "xl:top-[calc(var(--header-height)+36px)]",
        )}
      >
        <ThemeSwitch />
      </div>
      {children}
    </LayoutContainer>
  );
}
