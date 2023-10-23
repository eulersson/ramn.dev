"use client";

import { Cursor, CursorProvider } from "@/components/cursor";
// Third-Party
import { ThemeProvider } from "next-themes";

// Project

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="light" enableSystem={false} attribute="class">
      <CursorProvider>
        <Cursor />
        {children}
      </CursorProvider>
    </ThemeProvider>
  );
}
