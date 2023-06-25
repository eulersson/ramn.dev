export function Navbar() {
  const sections = ["home", "about", "experience", "projects"];
  const active = 0;
  return (
    <nav className="fixed flex w-full h-full -z-10 --font-nunito">
      {sections.map((s, i) => (
        <div key={i}>
          <div
            className={`h-full py-2 px-1 -mr-[2px] border-inside border-black ${
              s === sections[active]
                ? "text-white bg-black"
                : "text-black bg-white"
            }`}
            style={{ writingMode: "vertical-rl" }}
            key={s}
          >
            {[...Array(20)].map((e, j) => (
              <span
                className={`font-sans text-xl mb-2 select-none ${
                  j === 0 ? "font-bold" : ""
                }`}
                key={j}
              >
                {s}
              </span>
            ))}
          </div>
          <div className={`${s === sections[active] ? "grow": ""}`}></div>
        </div>
      ))}
    </nav>
  );
}
