import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const contentBlocks = blog.content
    .split("\n")
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16">
      <Link
        href="/blog"
        className="inline-flex rounded-full border border-zinc-300 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-700 transition hover:bg-zinc-100"
      >
        Back To Blogs
      </Link>

      <article className="mt-8">
        <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
          {blog.category?.name ?? "General"} •{" "}
          {new Date(blog.updatedAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <h1 className="mt-3 font-beni text-5xl uppercase leading-none text-[var(--foreground)]">
          {blog.title}
        </h1>

        {blog.description ? (
          <p className="mt-4 max-w-3xl text-lg text-zinc-700">{blog.description}</p>
        ) : null}

        <img
          src={blog.coverImage ?? "/assets/choose1.avif"}
          alt={blog.title}
          className="mt-8 h-[26rem] w-full rounded-3xl object-cover"
        />

        <div className="mt-8 space-y-4 text-base leading-8 text-zinc-700">
          {contentBlocks.map((paragraph, index) => (
            <p key={`${blog.id}-${index}`}>{paragraph}</p>
          ))}
        </div>

        {blog.tags.length > 0 ? (
          <div className="mt-10 flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-zinc-300 bg-white px-3 py-1 text-xs uppercase tracking-[0.12em] text-zinc-600"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </article>
    </main>
  );
}
