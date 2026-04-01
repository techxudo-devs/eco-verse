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

const bue = localFont({
  src:[
    {
      path: "../public/fonts/Bueno-VF.ttf",
      weight: "100 900", // Variable font supports a range of weights
      style: "normal",
    },
    {
      path: "../public/fonts/Bueno-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Bueno-Regular.otf",
      weight: "400",
      style: "normal",
    }
  ],
  variable: "--font-bue",
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://echoverse360.com"),
  title: {
    template: "%s | EchoVerse360",
    default: "EchoVerse360 — Growth Marketing Agency",
  },
  description:
    "EchoVerse360 is a growth marketing agency that turns creator influence into measurable business outcomes through Campaign Systems, Content Strategy, and scalable growth.",
  keywords: [
    "growth marketing",
    "growth marketing agency",
    "campaign systems",
    "content strategy",
    "creator marketing",
    "digital marketing agency",
    "EchoVerse360",
  ],
  authors: [{ name: "EchoVerse360" }],
  creator: "EchoVerse360",
  publisher: "EchoVerse360",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    siteName: "EchoVerse360",
    locale: "en_US",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "EchoVerse360" }],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@echoverse360",
    images: ["/og-default.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${bue.variable} ${beni.variable} ${clashGrotesk.variable} ${inter.variable} font-sans antialiased`}>
        <QueryProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </QueryProvider>
      </body>
    </html>
  );
}
