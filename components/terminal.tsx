// TODO: Make interactive: allow moving, minimizing, closing, resizing.
export function Terminal({
  command,
  children,
  className
}: {
  command: string;
  children: React.ReactNode;
  className: string;
}) {
  return (
    <div className={`flex flex-col border-inside shadow-blocky ${className}`}>
      <div className="bg-black p-[10px] flex space-x-[10px]">
        {[...Array(3)].map((_, i) => (
          <div
            className="w-[17px] h-[17px] bg-white hover:bg-[#eee] transition-colors rounded-full"
            key={i}
          ></div>
        ))}
      </div>
      <div className="grow bg-white p-5 text-xl">
        <pre>$ {command}</pre>
        <div className="font-mono">{children}</div>
      </div>
    </div>
  );
}
