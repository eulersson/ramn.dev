"use client";

// Third-Party
import { useTheme } from "next-themes";

export function ThemedImage({
  alt,
  lightSrc,
  darkSrc,
  className = "",
}: {
  alt: string;
  lightSrc: string;
  darkSrc: string;
  className?: string;
}) {
  const { resolvedTheme } = useTheme();
  const src = resolvedTheme === "light" ? lightSrc : darkSrc;
  return <img className={className} src={src} alt={alt} />;
}
