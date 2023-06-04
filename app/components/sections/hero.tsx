import { Cloth } from "../cloth";

export function Hero() {
  return (
    <section>
      <h1 className="text-center text-[80px] sm:text-[70px] leading-none font-title">
        Ramon Blanquer
      </h1>
      <h2 className="text-center text-[20.4px] sm:text-[17.5px] tracking-[1px] leading-none font-mono -mt-[10px]">
        <span className="ml-[4px]">from code to deployment; from back</span>
        <span className="ml-[32px]">to front.</span>
      </h2>
    </section>
  );
}
