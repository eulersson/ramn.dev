// Next.js
import { SpeedInsights } from "@vercel/speed-insights/next";
import {
  Fira_Mono,
  Nunito,
  Playfair_Display,
  Urbanist,
} from "next/font/google";
import Head from "next/head";

// Project
import { Providers } from "@/app/providers";
import { cn, isUpwork, toBool } from "@/lib";

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

const name = isUpwork ? "Ramon B." : "Ramon Blanquer";

export const metadata = {
  title: name + " | Full Stack Software & Graphics Engineer",
  description:
    "Solid Python, C++, TypeScript, and Go. Passionate about best developer experiences; streamlined dev environments are key for productivity and delivery. Advocating clean and maintainable code by implementing code formatting and quality analysis pipelines, and encouraging TDD through CI/CD workflows.",
  openGraph: {
    images: [
      {
        url: isUpwork ? "/opengraph-upwork.webp" : "/opengraph.webp",
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  if (toBool(process.env.NEXT_PUBLIC_PRINT_COMPONENT_RENDERING)) {
    console.log("[RootLayout] Rendering");
  }

  return (
    <html
      className={"invisible-scrollbar notranslate h-full" + " light"}
      translate="no"
      lang="en"
      style={{ colorScheme: "light" }}
    >
      <Head>
        <meta name="google" content="notranslate" />
      </Head>
      <body
        className={cn(
          firaMono.variable,
          nunito.variable,
          playfairDisplay.variable,
          urbanist.variable,
          "selection:bg-fore selection:text-back bg-back text-fore",
          "h-full",
        )}
      >
        <Providers>
          {children}
          {modal}
        </Providers>
        <div id="modal-root" />
        <SpeedInsights />
      </body>
    </html>
  );
}
