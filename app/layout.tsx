// Next.js
import {
  Fira_Mono,
  Nunito,
  Playfair_Display,
  Urbanist,
} from "next/font/google";

// Project
import { Providers } from "@/app/providers";
import { toBool } from "@/lib";

const firaMono = Fira_Mono({
  subsets: ["latin"],
  variable: "--font-fira-mono",
  weight: ["400", "500"],
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  style: ["normal", "italic"],
  weight: ["400", "700"],
  display: "swap",
});

const urbanist = Urbanist({
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-urbanist",
  weight: ["800"],
  display: "swap",
});

// Styles
import "./globals.css";

export const metadata = {
  title: "Ramon Blanquer",
  description: "Full Stack Software Engineer & Computer Graphics",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[RootLayout] Rendering");
  }
  return (
    // suppressHydrationWarning reason:
    // - https://github.com/pacocoursey/next-themes/tree/cd67bfa20ef6ea78a814d65625c530baae4075ef#with-app
    // - https://github.com/pacocoursey/next-themes/tree/cd67bfa20ef6ea78a814d65625c530baae4075ef#avoid-hydration-mismatch
    <html className="invisible-scrollbar" lang="en" suppressHydrationWarning>
      <body
        className={
          `${firaMono.variable} ${nunito.variable} ${playfairDisplay.variable} ${urbanist.variable} ` +
          "selection:bg-fore selection:text-back " +
          "bg-back text-fore "
        }
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
