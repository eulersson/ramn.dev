"use client";

// Third-Party
import { Cursor, CursorProvider } from "@/components/cursor";
import { ThemeProvider } from "next-themes";

// Project
import settings from "@/config/settings";
import { useTouchDevice } from "@/hooks/browser";

export function Providers({ children }: { children: React.ReactNode }) {
  const isTouchDevice = useTouchDevice();
  return (
    <ThemeProvider defaultTheme="light" enableSystem={false} attribute="class">
      {!(settings.touchDeviceDisableCursor && isTouchDevice) ? (
        <CursorProvider>
          <Cursor />
          {children}
        </CursorProvider>
      ) : (
        children
      )}
    </ThemeProvider>
  );
}
