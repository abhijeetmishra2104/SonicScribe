import type { Metadata } from "next";
import "./globals.css";
import { Inter, Source_Serif_4 } from "next/font/google";
import { TopBar } from "@/components/ui/top-bar";
import { Providers } from "./provider";  // Import the provider

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sourceSerif4 = Source_Serif_4({
  variable: "--font-source-serif-4",
  subsets: ["latin"],
  weight: ["200", "400", "600", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SonicScribe AI",
  description: "Intelligence that Listens. Precision that Heals.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${sourceSerif4.variable}`}>
      <body className="antialiased bg-background text-foreground">
        <Providers>    {/* Wrap children and TopBar inside Providers */}
        <TopBar session={null} />

          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
