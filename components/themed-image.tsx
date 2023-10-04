"use client";

// Next.js
import Image from "next/image";

// React
import { FunctionComponent, useEffect, useState } from "react";

// Third-Party
import { useTheme } from "next-themes";

export const ThemedImage: FunctionComponent<{
  width: number;
  height: number;
  src: string;
  alt: string;
  className?: string;
}> = ({ width, height, src, alt, className = "" }) => {
  const { resolvedTheme } = useTheme();

  const [fileName, extension] = src.split(".");

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  let srcThemed: string;
  switch (resolvedTheme) {
    case "light":
      srcThemed = `${fileName}.${extension}`;
      break;
    case "dark":
      srcThemed = `${fileName}-dark.${extension}`;
      break;
    default:
      srcThemed =
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
      break;
  }

  return (
    <Image
      className={className}
      src={srcThemed}
      width={width}
      height={height}
      alt={alt}
    />
  );
};

export default ThemedImage;
