export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Home from "@/app/Home/Home";

export const metadata: Metadata = {
  title: "Home",
  description:
    "EchoVerse360 is a growth marketing agency that turns creator influence into measurable business outcomes through Campaign Systems, Content Strategy, and scalable growth.",
  openGraph: {
    title: "EchoVerse360 — Growth Marketing Agency",
    description:
      "EchoVerse360 turns creator influence into measurable business outcomes through growth-focused campaign systems and content strategy.",
    url: "/",
    type: "website",
  },
};

const page = () => {
  return (
    <div>
      <Home />
    </div>
  );
};

export default page;
