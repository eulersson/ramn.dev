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
      <Terminal className="m-g2 h-g10" command="whoami">
        <WhoAmI />
      </Terminal>
      <Block classNames={{ main: "h-g5", tags: "h-g3" }} tags={tags}>
        <Intention />
      </Block>
      <Anthem />
    </section>
  );
}
