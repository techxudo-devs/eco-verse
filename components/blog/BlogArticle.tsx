import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import ContentImageGrid from "@/components/shared/ContentImageGrid";
import EmbedGrid from "@/components/shared/EmbedGrid";
import type { BlogStudioContent } from "@/lib/blogs/studioContent";

type BlogArticleProps = {
  title: string;
  coverImage?: string;
  description?: string;
  content: BlogStudioContent;
  tags?: string[];
  meta?: ReactNode;
  actions?: ReactNode;
  className?: string;
  showBackLink?: boolean;
};

export default function BlogArticle({
  title,
  coverImage,
  description,
  content,
  tags = [],
  meta,
  actions,
  className,
  showBackLink = true,
}: BlogArticleProps) {
  return (
    <main className={className ?? "w-full px-6 py-16 md:px-10"}>
      {actions}

      <article className="mt-6 space-y-8">
        {meta}

        <h1 className="text-4xl font-bold leading-tight text-[var(--foreground)] md:text-5xl">
          {title}
        </h1>

        {description ? (
          <p className="max-w-3xl text-lg text-zinc-700">{description}</p>
        ) : null}

        {coverImage ? (
          <div className="relative h-[24rem] w-full overflow-hidden rounded-3xl bg-zinc-100 md:h-[30rem]">
            <Image
              src={coverImage}
              alt={title}
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        ) : null}

        <div className="space-y-12">
          {content.blocks.map((block, blockIndex) => (
            <section key={`blog-block-${blockIndex}`} className="space-y-6">
              {block.heading ? (
                <h2 className="text-2xl font-bold leading-tight text-zinc-900 md:text-3xl">
                  {block.heading}
                </h2>
              ) : null}

              {block.content ? (
                <div className="space-y-4 text-base leading-8 text-zinc-700">
                  {block.content
                    .split(/\n\n+/)
                    .map((paragraph) => paragraph.trim())
                    .filter(Boolean)
                    .map((paragraph, paragraphIndex) => (
                      <p
                        key={`blog-block-${blockIndex}-paragraph-${paragraphIndex}`}
                      >
                        {paragraph}
                      </p>
                    ))}
                </div>
              ) : null}

              {block.images.length > 0 ? (
                <ContentImageGrid
                  images={block.images}
                  altBase={`${title} block ${blockIndex + 1}`}
                />
              ) : null}

              {block.embeds.length > 0 ? (
                <EmbedGrid
                  embeds={block.embeds}
                  idPrefix={`blog-block-${blockIndex}`}
                />
              ) : null}
            </section>
          ))}
        </div>

        {tags.length > 0 ? (
          <div className="mt-10 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-zinc-300 bg-white px-3 py-1 text-xs uppercase tracking-[0.12em] text-zinc-600"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        {showBackLink ? (
          <Link
            href="/blog"
            className="inline-flex rounded-full border border-zinc-300 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-700 transition hover:bg-zinc-100"
          >
            Back To Blogs
          </Link>
        ) : null}
      </article>
    </main>
  );
}
