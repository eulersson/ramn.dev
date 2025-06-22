// Third-Party
import {
  Fira_Mono,
  Nunito,
  Playfair_Display,
  Urbanist,
} from "next/font/google";

// Project
import { CoverWrapper } from "@/components/layout/cover-wrapper";
import { Providers } from "@/app/providers";
import { toBool } from "@/utils";

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

export const metadata = {
  title: "Ramon Blanquer",
  description: "Full Stack Software Engineer & Computer Graphics",
};

// Styles
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[RootLayout] Rendering");
  }
  const disableCover = toBool(process.env.NEXT_PUBLIC_DISABLE_COVER);
  return (
    // suppressHydrationWarning reason:
    // - https://github.com/pacocoursey/next-themes/tree/cd67bfa20ef6ea78a814d65625c530baae4075ef#with-app
    // - https://github.com/pacocoursey/next-themes/tree/cd67bfa20ef6ea78a814d65625c530baae4075ef#avoid-hydration-mismatch
    <html className="invisible-scrollbar" lang="en" suppressHydrationWarning>
      <head>
        {/* https://tailwindcss.com/docs/responsive-design#overview */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta name="apple-mobile-web-app-title" content="ramn.dev" />
      </head>

      <body
        className={
          `${firaMono.variable} ${nunito.variable} ${playfairDisplay.variable} ${urbanist.variable} ` +
          "selection:bg-fore selection:text-back " +
          "bg-back text-fore "
        }
      >
        {disableCover ? (
          <Providers>{children}</Providers>
        ) : (
          <CoverWrapper>
            <Providers>{children}</Providers>
          </CoverWrapper>
        )}
      </body>
    </html>
  );
}
