"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
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
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <main className={className ?? "w-full bg-[var(--background)]"}>
      {actions}

      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative h-[60vh] w-full overflow-hidden md:h-[75vh]"
      >
        {coverImage ? (
          <motion.div style={{ scale: imageScale }} className="h-full w-full">
            <Image
              src={coverImage}
              alt={title}
              fill
              unoptimized
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70" />
          </motion.div>
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-[#F97316] via-[#fdba74] to-[#15803d]" />
        )}

        <motion.div
          style={{ opacity }}
          className="absolute inset-0 flex items-end"
        >
          <div className="w-full px-6 pb-12 md:px-10 md:pb-16">
            <div className="mx-auto max-w-5xl">
              {meta && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-4"
                >
                  <div className="inline-block rounded-full border border-white/30 bg-white/10 px-4 py-2 backdrop-blur-sm">
                    <div className="text-xs font-semibold uppercase tracking-[0.16em] text-white">
                      {meta}
                    </div>
                  </div>
                </motion.div>
              )}

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-beni text-4xl font-black uppercase leading-[0.95] text-white md:text-6xl lg:text-7xl"
              >
                {title}
              </motion.h1>

              {description && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-6 max-w-2xl font-clash text-base text-white/90 md:text-lg"
                >
                  {description}
                </motion.p>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Content Section */}
      <article className="relative -mt-20 px-6 pb-20 md:px-10">
        <div className="mx-auto max-w-4xl">
          {/* Content Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-xl md:p-12"
          >
            <div className="space-y-16">
              {content.blocks.map((block, blockIndex) => (
                <motion.section
                  key={`blog-block-${blockIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: blockIndex * 0.1 }}
                  className="space-y-6"
                >
                  {block.heading && (
                    <h2 className="font-beni text-3xl font-bold uppercase leading-tight text-zinc-900 md:text-4xl">
                      {block.heading}
                    </h2>
                  )}

                  {block.content && (
                    <div className="prose prose-lg max-w-none space-y-5 font-clash text-base leading-relaxed text-zinc-700">
                      {block.content
                        .split(/\n\n+/)
                        .map((paragraph) => paragraph.trim())
                        .filter(Boolean)
                        .map((paragraph, paragraphIndex) => (
                          <p
                            key={`blog-block-${blockIndex}-paragraph-${paragraphIndex}`}
                            className="first-letter:font-beni first-letter:text-5xl first-letter:font-bold first-letter:text-[#F97316] first-of-type:first-letter:float-left first-of-type:first-letter:mr-3 first-of-type:first-letter:mt-1"
                          >
                            {paragraph}
                          </p>
                        ))}
                    </div>
                  )}

                  {block.images.length > 0 && (
                    <div className="my-8">
                      <ContentImageGrid
                        images={block.images}
                        altBase={`${title} block ${blockIndex + 1}`}
                      />
                    </div>
                  )}

                  {block.embeds.length > 0 && (
                    <div className="my-8">
                      <EmbedGrid
                        embeds={block.embeds}
                        idPrefix={`blog-block-${blockIndex}`}
                      />
                    </div>
                  )}
                </motion.section>
              ))}
            </div>

            {/* Tags Section */}
            {tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-16 border-t border-zinc-200 pt-8"
              >
                <h3 className="mb-4 font-beni text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">
                  Topics
                </h3>
                <div className="flex flex-wrap gap-3">
                  {tags.map((tag, index) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      className="rounded-full border-2 border-[#F97316]/20 bg-gradient-to-r from-[#F97316]/5 to-[#15803d]/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-700 transition-all hover:border-[#F97316]/40"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Back Link */}
            {showBackLink && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-12 flex justify-center border-t border-zinc-200 pt-8"
              >
                <Link
                  href="/blog"
                  className="group inline-flex items-center gap-2 rounded-full border-2 border-[#15803d]/30 bg-gradient-to-r from-white to-[#15803d]/5 px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[#15803d] transition-all duration-300 hover:border-[#15803d] hover:shadow-lg"
                >
                  <svg
                    className="h-4 w-4 transition-transform group-hover:-translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Back To Blogs
                </Link>
              </motion.div>
            )}
          </motion.div>
        </div>
      </article>
    </main>
  );
}
