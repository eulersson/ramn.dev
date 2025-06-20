"use client";

// Third-Party
import { Cursor, CursorProvider } from "@/components/cursor";
import { ThemeProvider } from "next-themes";

// Project
import { useTouchDevice } from "@/hooks/browser";

export function Providers({ children }: { children: React.ReactNode }) {
  const isTouchDevice = useTouchDevice();
  return (
    <ThemeProvider defaultTheme="light" enableSystem={false} attribute="class">
      {isTouchDevice ? (
        children
      ) : (
        <CursorProvider>
          <Cursor />
          {children}
        </CursorProvider>
      )}
    </ThemeProvider>
  );
}
