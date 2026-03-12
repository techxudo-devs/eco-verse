import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { CaseStudyContent } from "@/lib/projects/caseStudyContent";

type EmbedProvider = "instagram" | "youtube";

type EmbedData = {
  provider: EmbedProvider;
  src: string;
  link: string;
};

const extractFirstUrl = (value: string) => {
  const iframeSrcMatch = value.match(/<iframe[^>]+src=["']([^"']+)["']/i);
  if (iframeSrcMatch?.[1]) {
    return iframeSrcMatch[1];
  }

  const blockquoteCiteMatch = value.match(/<blockquote[^>]+cite=["']([^"']+)["']/i);
  if (blockquoteCiteMatch?.[1]) {
    return blockquoteCiteMatch[1];
  }

  const inlineUrlMatch = value.match(/https?:\/\/[^\s"'<>()]+/i);
  if (inlineUrlMatch?.[0]) {
    return inlineUrlMatch[0];
  }

  if (value.startsWith("www.")) {
    return `https://${value}`;
  }

  return value;
};

const toEmbedData = (value: string): EmbedData | null => {
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  const looksLikeEmbedCode = trimmed.includes("<iframe") || trimmed.includes("<blockquote");
  const looksLikeSingleUrl = /^https?:\/\//i.test(trimmed) || trimmed.startsWith("www.");

  if (!looksLikeEmbedCode && !looksLikeSingleUrl) {
    return null;
  }

  const possibleUrl = extractFirstUrl(trimmed);

  let parsed: URL;
  try {
    parsed = new URL(possibleUrl);
  } catch {
    return null;
  }

  const host = parsed.hostname.toLowerCase();
  const pathSegments = parsed.pathname.split("/").filter(Boolean);

  if (
    host === "youtube.com" ||
    host === "www.youtube.com" ||
    host === "m.youtube.com" ||
    host === "youtu.be"
  ) {
    let videoId = "";

    if (host === "youtu.be") {
      videoId = pathSegments[0] ?? "";
    } else if (pathSegments[0] === "watch") {
      videoId = parsed.searchParams.get("v") ?? "";
    } else if (pathSegments[0] === "shorts" || pathSegments[0] === "embed") {
      videoId = pathSegments[1] ?? "";
    }

    if (!videoId) {
      return null;
    }

    return {
      provider: "youtube",
      src: `https://www.youtube.com/embed/${videoId}`,
      link: `https://www.youtube.com/watch?v=${videoId}`,
    };
  }

  if (host === "instagram.com" || host === "www.instagram.com") {
    const contentType = pathSegments[0];
    const postId = pathSegments[1];

    if (!contentType || !postId) {
      return null;
    }

    if (!["p", "reel", "tv"].includes(contentType)) {
      return null;
    }

    const link = `https://www.instagram.com/${contentType}/${postId}/`;
    return {
      provider: "instagram",
      src: `${link}embed`,
      link,
    };
  }

  return null;
};

type ProjectCaseStudyProps = {
  title: string;
  coverImage: string;
  shortDescription: string;
  tags?: string[];
  content: CaseStudyContent;
  actions?: ReactNode;
  className?: string;
};

export default function ProjectCaseStudy({
  title,
  coverImage,
  shortDescription,
  tags = [],
  content,
  actions,
  className,
}: ProjectCaseStudyProps) {
  const containerClass = "container mx-auto px-6 md:px-10 ";
  const heroImages = content.heroImages.filter(Boolean).slice(0, 4);
  const singleHeroImage = heroImages[0] || coverImage;

  return (
    <div className={className ?? "bg-[#efefef]"}>
      <section className="relative h-[70vh] min-h-[420px] overflow-hidden">
        {heroImages.length > 1 ? (
          <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-1">
            {heroImages.length === 2 ? (
              heroImages.map((image, index) => (
                <div key={`${image}-${index}`} className="relative row-span-2">
                  <Image
                    src={image}
                    alt={`${title} hero ${index + 1}`}
                    fill
                    unoptimized
                    priority={index === 0}
                    className="object-cover"
                  />
                </div>
              ))
            ) : heroImages.length === 3 ? (
              <>
                <div className="relative row-span-2">
                  <Image
                    src={heroImages[0]}
                    alt={`${title} hero 1`}
                    fill
                    unoptimized
                    priority
                    className="object-cover"
                  />
                </div>
                {heroImages.slice(1).map((image, index) => (
                  <div key={`${image}-${index + 1}`} className="relative">
                    <Image
                      src={image}
                      alt={`${title} hero ${index + 2}`}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                ))}
              </>
            ) : (
              heroImages.map((image, index) => (
                <div key={`${image}-${index}`} className="relative">
                  <Image
                    src={image}
                    alt={`${title} hero ${index + 1}`}
                    fill
                    unoptimized
                    priority={index === 0}
                    className="object-cover"
                  />
                </div>
              ))
            )}
          </div>
        ) : singleHeroImage ? (
          <Image
            src={singleHeroImage}
            alt={title}
            fill
            unoptimized
            priority
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full bg-zinc-900" />
        )}

        <div className="absolute inset-0 bg-black/45" />

        <div className="absolute left-0 right-0 top-0 z-20 px-6 py-5 md:px-10">
          {actions}
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 pb-8 md:pb-10">
          <div className={`${containerClass} text-white`}>
            <h1 className="max-w-4xl capitalize text-4xl font-bold leading-tight md:text-6xl">
              {title}
            </h1>

            <div className="mt-6 border-t border-white/75 pt-5">
              <div className="grid gap-6 md:grid-cols-2">
                <p className="max-w-xl capitalize text-2xl leading-relaxed text-white/95">
                  {content.summary || shortDescription}
                </p>

                <div className="space-y-2 text-lg text-white/95">
                  {content.heroDetails.map((item, index) => (
                    <p key={`${item.label}-${index}`}>
                      <span className="font-semibold">{item.label}:</span>{" "}
                      <span>{item.value}</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f5f5] py-8">
        <div
          className={`${containerClass} grid gap-6 text-center sm:grid-cols-2 lg:grid-cols-4`}
        >
          {content.stats.map((item, index) => (
            <div key={`${item.label}-${index}`}>
              <p className="text-4xl font-bold text-black">{item.value}</p>
              <p className="mt-2 text-2xl font-semibold text-black/95">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-black py-8">
        <div className={`${containerClass} flex items-center justify-between gap-4`}>
          <h3 className="text-xl font-semibold text-white md:text-2xl">
            Ready to Drive Engagement and Impact for Your Brand?
          </h3>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center justify-center bg-[#ff006e] px-7 py-4 text-lg font-semibold text-white transition hover:bg-[#ff2a86]"
          >
            Let&apos;s Talk
          </Link>
        </div>
      </section>

      <section className={`${containerClass} space-y-20 py-16`}>
        {content.sections.map((section, sectionIndex) => (
          <article
            key={`${section.title}-${sectionIndex}`}
            className="grid gap-8 md:grid-cols-[1fr_1.1fr]"
          >
            <h2 className="text-3xl font-bold text-black md:text-4xl">
              {section.title}
            </h2>
            <div className="space-y-6 text-lg leading-relaxed text-black/90">
              {section.paragraphs.map((paragraph, paragraphIndex) => (
                <p key={`${section.title}-paragraph-${paragraphIndex}`}>{paragraph}</p>
              ))}

              {section.embeds.length > 0 ? (
                <div className="flex flex-wrap gap-4">
                  {section.embeds.map((embed, embedIndex) => {
                    const embedData = toEmbedData(embed);

                    if (!embedData) {
                      return (
                        <a
                          key={`${section.title}-embed-link-${embedIndex}`}
                          href={embed}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex text-sm font-semibold text-[#ff006e] hover:text-[#ff2a86]"
                        >
                          Open link {embedIndex + 1}
                        </a>
                      );
                    }

                    return (
                      <div
                        key={`${section.title}-embed-${embedIndex}`}
                        className="min-w-[280px] flex-1 space-y-3"
                      >
                        <div
                          className={`overflow-hidden rounded-2xl border border-zinc-200 bg-black ${
                            embedData.provider === "youtube"
                              ? "aspect-video"
                              : "mx-auto max-w-[420px] aspect-[9/16]"
                          }`}
                        >
                          <iframe
                            src={embedData.src}
                            title={`${embedData.provider} embed ${embedIndex + 1}`}
                            className="h-full w-full"
                            loading="lazy"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          />
                        </div>
                        <a
                          href={embedData.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex text-sm font-semibold text-[#ff006e] hover:text-[#ff2a86]"
                        >
                          View on {embedData.provider === "instagram" ? "Instagram" : "YouTube"}
                        </a>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </section>

      {tags.length > 0 ? (
        <section className={`${containerClass} flex flex-wrap gap-2 pb-12`}>
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-zinc-300 bg-white px-3 py-1 text-xs font-semibold text-zinc-600"
            >
              {tag}
            </span>
          ))}
        </section>
      ) : null}
    </div>
  );
}
