"use client";

// Third-Party
import { ThemeProvider } from "next-themes";

// Project
import { Cursor } from "@/components/cursor";
import { CursorProvider } from "@/contexts/cursor";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="light" enableSystem={false}>
      <CursorProvider>
        <Cursor />
        {children}
      </CursorProvider>
    </ThemeProvider>
  );
}
