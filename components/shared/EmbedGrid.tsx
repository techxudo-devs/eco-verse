import { toEmbedData } from "@/lib/embeds/embedParser";

type EmbedGridProps = {
  embeds: string[];
  idPrefix: string;
};

export default function EmbedGrid({ embeds, idPrefix }: EmbedGridProps) {
  if (embeds.length === 0) {
    return null;
  }

  return (
    <div className={`grid w-full gap-6 ${embeds.length > 1 ? "md:grid-cols-2" : "grid-cols-1"}`}>
      {embeds.map((embed, embedIndex) => {
        const embedData = toEmbedData(embed);

        if (!embedData) {
          return (
            <a
              key={`${idPrefix}-embed-link-${embedIndex}`}
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
          <div key={`${idPrefix}-embed-${embedIndex}`} className="mx-auto w-full max-w-[420px] space-y-3">
            <div
              className={`overflow-hidden rounded-2xl border border-zinc-200 bg-black ${
                embedData.provider === "youtube" ? "aspect-video" : "h-[760px]"
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
  );
}

