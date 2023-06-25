export function Button({ children, className="" }: { children: React.ReactNode, className?: string }) {
  return (
    <button
      className={`font-sans font-thin bg-white rounded-full border-inside px-3 transition-all shadow-button hover:shadow-buttonhover translate-y-0 hover:translate-y-px ${className}`}
    >
      {children}
    </button>
  );
}
