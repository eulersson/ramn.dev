// Next.js
import {
  Fira_Mono,
  Nunito,
  Playfair_Display,
  Urbanist,
} from "next/font/google";

// Styles
import "./globals.css";

// Environment
import environment from "@/environment";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (environment.printComponentRendering) {
    console.log("[RootLayout] Rendering.");
  }
  return (
    <html lang="en">
      <body
        className={`${firaMono.variable} ${nunito.variable} ${playfairDisplay.variable} ${urbanist.variable} selection:bg-black selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
