export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectCaseStudy from "@/components/projects/ProjectCaseStudy";
import { getProjectBySlug } from "@/lib/services/projectService";
import { normalizeCaseStudyContent, toContentRecord } from "@/lib/projects/caseStudyContent";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.shortDescription ?? undefined,
    openGraph: {
      title: project.title,
      description: project.shortDescription ?? undefined,
      url: `/projects/${project.slug}`,
      type: "article",
      images: project.coverImage ? [{ url: project.coverImage, width: 1200, height: 630, alt: project.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.shortDescription ?? undefined,
      images: project.coverImage ? [project.coverImage] : undefined,
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const createdDate = new Date(project.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });

  const content = normalizeCaseStudyContent({
    rawContent: toContentRecord(project.content),
    shortDescription: project.shortDescription ?? "",
    description: project.description ?? "",
    createdDate,
    coverImage: project.coverImage ?? "",
  });

  return (
    <ProjectCaseStudy
      title={project.title}
      coverImage={project.coverImage ?? ""}
      shortDescription={project.shortDescription ?? ""}
      tags={project.tags ?? []}
      content={content}
    />
  );
}
