// Project
import { BackgroundGrid } from "@/components/layout/background-grid";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
      <div className="bg-sky-200 py-4">
        <main>{children}</main>
        <BackgroundGrid />
      </div>
  );
}