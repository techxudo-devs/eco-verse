export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Awards from "@/components/home/Awards";
import { getProjects } from "@/lib/services/projectService";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore EchoVerse360 growth marketing campaigns and case studies. See how brands achieved measurable results through creator-led systems.",
  openGraph: {
    title: "Projects — EchoVerse360",
    description:
      "Growth marketing campaigns and case studies from EchoVerse360. Real results through creator-led systems.",
    url: "/projects",
    type: "website",
  },
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="projects-page-cursor">
      <Awards projects={projects} />
    </div>
  );
}
