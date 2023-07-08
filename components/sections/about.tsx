// Next.js
import Image from "next/image";

// Components
import { Block } from "@/components/block";
import { TagProps } from "@/components/tag";
import { Terminal } from "@/components/terminal";
import { Title } from "@/components/title";

// Content
import Anthem from "@/content/projects/anthem.mdx";
import Intention from "@/content/sections/intention.mdx";
import WhoAmI from "@/content/sections/whoami.mdx";

export function About() {
  const tags: TagProps[] = [
    { text: "Python", dotted: false },
    { text: "C++", dotted: false },
    { text: "JavaScript", dotted: false },
  ];
  return (
    <section className="flex flex-col justify-center">
      <Title>Who Am I?</Title>
      <Terminal className="m-g2 mt-[2px] h-g10" command="whoami">
        <WhoAmI />
      </Terminal>
      <div className="relative grid grid-cols-4 p-[2px] gap-[2px]">
        <div>
          <Image
            className="absolute top-[-61px] left-[-108px] w-[366px]"
            src="/displaced-me.png"
            width={707}
            height={685}
            alt="Displaced Me"
          />
        </div>
        <div className="col-span-3">
          <Block classNames={{ main: "h-g5", tags: "h-g3" }} tags={tags}>
            <Intention />
          </Block>
        </div>
      </div>
    </section>
  );
}
