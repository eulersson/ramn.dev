"use client";

// Third-Party
import { Cursor, CursorProvider } from "@/components/cursor";
import { ThemeProvider } from "next-themes";

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
