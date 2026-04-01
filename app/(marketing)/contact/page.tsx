import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a growth marketing project with EchoVerse360. Tell us about your vision — we'll turn it into a measurable campaign.",
  openGraph: {
    title: "Contact EchoVerse360",
    description:
      "Start a growth marketing project with EchoVerse360. Tell us about your vision — we'll turn it into a measurable campaign.",
    url: "/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
