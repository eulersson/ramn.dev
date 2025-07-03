// Next.js
import {
  Fira_Mono,
  Nunito,
  Playfair_Display,
  Urbanist,
} from "next/font/google";

// Project
import { Providers } from "@/app/providers";
import { cn, toBool } from "@/lib";

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
  title: "Ramon Blanquer | Full Stack Software & Graphics Engineer",
  description:
    "Solid Python, C++, TypeScript, and Go. AI hobbyist. Passionate about best developer experiences; streamlined dev environments are key for productivity and delivery. Advocating clean and maintainable code by implementing code formatting and quality analysis pipelines, and encouraging TDD through CI/CD workflows.",
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
      className="invisible-scrollbar light"
      lang="en"
      style={{ colorScheme: "light" }}
    >
      <body
        className={cn(
          firaMono.variable,
          nunito.variable,
          playfairDisplay.variable,
          urbanist.variable,
          "selection:bg-fore selection:text-back bg-back text-fore",
        )}
      >
        <Providers>
          {children}
          {modal}
        </Providers>
        <div id="modal-root" />
      </body>
    </html>
  );
}
