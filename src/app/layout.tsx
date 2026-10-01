import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { AppProviders } from "@/context/AppProviders";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Hauwa Mohammed Price Checker",
  description:
    "Computerized Price Checking System for Hauwa Mohammed — organization, company, shop, and public price verification.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${outfit.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans text-ink">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
