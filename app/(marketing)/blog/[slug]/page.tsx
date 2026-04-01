export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogArticle from "@/components/blog/BlogArticle";
import {
  normalizeBlogStudioContent,
  toBlogContentRecord,
} from "@/lib/blogs/studioContent";
import { getBlogBySlug } from "@/lib/services/blogService";

type BlogDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: blog.title,
    description: blog.description ?? undefined,
    openGraph: {
      title: blog.title,
      description: blog.description ?? undefined,
      url: `/blog/${blog.slug}`,
      type: "article",
      images: blog.coverImage ? [{ url: blog.coverImage, width: 1200, height: 630, alt: blog.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description ?? undefined,
      images: blog.coverImage ? [blog.coverImage] : undefined,
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const content = normalizeBlogStudioContent({
    rawContent: toBlogContentRecord(blog.content),
    fallbackContent: blog.content,
  });

  return (
    <BlogArticle
      title={blog.title}
      coverImage={blog.coverImage ?? "/assets/choose1.avif"}
      description={blog.description ?? ""}
      content={content}
      tags={blog.tags}
      meta={
        <>
          {blog.category?.name ?? "General"} •{" "}
          {new Date(blog.updatedAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </>
      }
    />
  );
}
