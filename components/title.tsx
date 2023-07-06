export function Title({
  children,
  className="",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={`inline m-auto mt-[calc((var(--bg-grid-box-size)-100px)/2)] mb-[calc((var(--bg-grid-box-size)-100px)/2)] font-serif font-normal leading-none text-[60px] p-[20px] bg-white border-inside shadow-blocky ${className}`}
    >
      {children}
    </h1>
  );
}
