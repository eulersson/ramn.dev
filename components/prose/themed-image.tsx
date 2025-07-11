"use client";

// Third-Party
import { useTheme } from "next-themes";

export function ThemedImage({
  alt,
  lightSrc,
  darkSrc,
}: {
  alt: string;
  lightSrc: string;
  darkSrc: string;
}) {
  const { resolvedTheme } = useTheme();
  const src = resolvedTheme === "light" ? lightSrc : darkSrc;
  return <img src={src} alt={alt} />;
}
