export function Title({
  children,
  className="",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={`inline m-auto font-serif text-6xl p-[20px] bg-white border-inside shadow-blocky ${className}`}
    >
      {children}
    </h1>
  );
}
