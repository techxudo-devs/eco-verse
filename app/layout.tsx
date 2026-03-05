import type { Metadata } from "next";
import { Inter } from "next/font/google";
import QueryProvider from "@/lib/providers/QueryProvider";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import localFont from "next/font/local";

const clashGrotesk = localFont({
  src: [
    {
      path: "../public/fonts/ClashGrotesk-Extralight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/ClashGrotesk-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/ClashGrotesk-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/ClashGrotesk-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/ClashGrotesk-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/ClashGrotesk-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-clash",
});

const beni = localFont({
  src: [
    {
      path: "../public/fonts/BeniLight.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/BeniBold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/BeniBlack.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-beni",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eco Verse",
  description: "Eco Verse | We Built Verses For You",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${beni.variable} ${clashGrotesk.variable} ${inter.variable} font-sans antialiased`}>
        <QueryProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </QueryProvider>
      </body>
    </html>
  );
}
