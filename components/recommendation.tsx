export function Recommendation({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="italic font-light indent-8">{children}</blockquote>
  );
}
