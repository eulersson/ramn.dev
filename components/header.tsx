// Next.js
import Image from "next/image";

// Components
import { Button } from '@/components/button';

export function Header({ large = true }: { large?: boolean }) {
  const boxWidth = "w-[calc(var(--bg-grid-box-size)+2px)]";
  const gapWidth = large
    ? "w-[calc(var(--bg-grid-box-size)*2+2px)] -mx-[2px]"
    : "w-[calc(var(--bg-grid-box-size)*2-0px)]";
  // outline outline-2 -outline-offset-2 outline-blue-500
  return (
    <div className="sticky top-0 h-g3 w-full flex justify-center z-20">
      <header className="flex">
        <div
          className={`${boxWidth} bg-white p-[10px] pt-[13px] border-inside ${
            large ? "" : "-mr-px"
          }`}
        >
          <h1 className="font-title inline text-[44px] leading-[30px] select-none">
            Ramon Blanquer
          </h1>
        </div>
        {large && (
          <div className={`${gapWidth} bg-white border-inside text-lg`}>
            <div className="border-black border-b h-1/2 flex justify-center items-center">
              <pre>
                <u>blanquer.ramon@gmail.com</u>
              </pre>
            </div>
            <div className="border-black border-t h-1/2 flex justify-center items-center">
              <pre>
                <u>+34 644 81 74 69</u>
              </pre>
            </div>
          </div>
        )}
        <div
          className={`${boxWidth} bg-white flex flex-col justify-between border-inside ${
            large ? "" : "-ml-px"
          }`}
        >
          <div className="flex space-x-2 px-[8px] pt-[16px]">
            <Image src="/github.svg" alt="GitHub Logo" width={24} height={24} />
            <Image
              src="/linkedin.svg"
              alt="GitHub Logo"
              width={24}
              height={24}
            />
            {/* <Image src="/twitter.svg" alt="GitHub Logo" width={24} height={24} /> */}
            <Button className="px-4">
              Resume <span className="text-[10px] align-middle">(CV)</span>
            </Button>
          </div>
          <div className="p-[10px] leading-[15px] text-[12px]">
            <pre className="inline-block bg-black text-white mb-px">
              from code to deployment;
            </pre>
            <pre className="inline-block bg-black text-white">
              from back to front
              <span className="inline-block animate-blinky">;</span>
            </pre>
          </div>
        </div>
      </header>
    </div>
  );
}
