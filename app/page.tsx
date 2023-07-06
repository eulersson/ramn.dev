// Components
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { PageWrapper } from "@/app/page-wrapper";

export default function Home() {
  return (
    <PageWrapper>
      <div className="flex flex-col">
        <About />
        <Experience />
      </div>
    </PageWrapper>
  );
}
