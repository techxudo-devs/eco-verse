import Link from "next/link";
import { getBlogs } from "@/lib/services/blogService";

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16">
      <div className="mb-12">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Journal</p>
        <h1 className="mt-2 font-beni text-5xl uppercase leading-none text-[var(--foreground)]">
          Latest Blogs
        </h1>
      </div>

      {blogs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-white px-6 py-12 text-center text-zinc-500">
          No blogs yet.
        </div>
      ) : (
        <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white"
            >
              <Link href={`/blog/${blog.slug}`} className="block">
                <img
                  src={blog.coverImage ?? "/assets/choose1.avif"}
                  alt={blog.title}
                  className="h-64 w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </Link>
              <div className="space-y-3 p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                  {blog.category?.name ?? "General"}
                </p>
                <h2 className="font-beni text-2xl uppercase leading-tight text-[var(--foreground)]">
                  <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                </h2>
                <p className="line-clamp-3 text-sm text-zinc-600">
                  {blog.description || blog.content}
                </p>
                <Link
                  href={`/blog/${blog.slug}`}
                  className="inline-flex items-center rounded-full border border-[var(--color-green)]/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--foreground)] transition hover:bg-[var(--color-green)]/10"
                >
                  Read Article
                </Link>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
