import { MetadataRoute } from "next";
import { getBlogs } from "@/lib/services/blogService";
import { getProjects } from "@/lib/services/projectService";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://echoverse360.com";

const teamSlugs = ["fahad-bashir", "shoaib-hussain", "ovais-ilyas"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/projects`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE_URL}/terms-and-conditions`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
  ];

  const teamPages: MetadataRoute.Sitemap = teamSlugs.map((slug) => ({
    url: `${BASE_URL}/team/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  let blogPages: MetadataRoute.Sitemap = [];
  let projectPages: MetadataRoute.Sitemap = [];

  try {
    const blogs = await getBlogs();
    blogPages = blogs.map((blog) => ({
      url: `${BASE_URL}/blog/${blog.slug}`,
      lastModified: new Date(blog.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));
  } catch {}

  try {
    const projects = await getProjects();
    projectPages = projects.map((project) => ({
      url: `${BASE_URL}/projects/${project.slug}`,
      lastModified: new Date(project.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));
  } catch {}

  return [...staticPages, ...teamPages, ...blogPages, ...projectPages];
}
