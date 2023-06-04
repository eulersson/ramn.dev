import "./globals.css";

import {
  Fira_Mono,
  Nunito,
  Playfair_Display,
  Urbanist,
} from "@next/font/google";

export const firaMono = Fira_Mono({
  subsets: ["latin"],
  variable: "--font-fira-mono",
  weight: ["400"],
  display: "swap",
});

export const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["200"],
  display: "swap",
});

export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  style: "italic",
  weight: ["500"],
  display: "swap",
});

export const urbanist = Urbanist({
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
  const copies = 100;
  return (
    <html lang="en">
      <body
        className={`${firaMono.variable} ${nunito.variable} ${playfairDisplay.variable} ${urbanist.variable}`}
      >
        <div className="absolute">{children}</div>
        <div className="bg-grid">
          <div className="bg-grid__screen-clipper">
            <div className="bg-grid__grid">
              <div className="bg-grid__grid-half bg-grid__grid-half--left">
                {[...Array(copies)].map((e, i) => (
                  <div className="bg-grid__box" key={i}></div>
                ))}
              </div>
              <div className="bg-grid__grid-half bg-grid__grid-half--right">
                {[...Array(copies)].map((e, i) => (
                  <div className="bg-grid__box" key={i}></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
