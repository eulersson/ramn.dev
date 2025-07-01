export function Caption({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-end">
      <em className="bg-fore text-back">{children}</em>
    </div>
  );
}
