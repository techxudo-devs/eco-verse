export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { getBlogs } from "@/lib/services/blogService";
import BlogList from "@/components/blog/BlogList";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Growth marketing insights, campaign strategies, and content tips from the EchoVerse360 team. Stay ahead with the latest in creator-led growth.",
  openGraph: {
    title: "Blog — EchoVerse360",
    description:
      "Growth marketing insights, campaign strategies, and content tips from the EchoVerse360 team.",
    url: "/blog",
    type: "website",
  },
};

export default async function BlogPage() {
  const blogs = await getBlogs();

  return <BlogList blogs={blogs} />;
}
