export type BlogContentBlock = {
  heading: string;
  content: string;
  embeds: string[];
  images: string[];
};

export type BlogStudioContent = {
  blocks: BlogContentBlock[];
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const toBlogContentRecord = (content: unknown) => {
  if (!content) {
    return {} as Record<string, unknown>;
  }

  if (typeof content === "string") {
    try {
      const parsed = JSON.parse(content);
      return isRecord(parsed) ? parsed : {};
    } catch {
      return {};
    }
  }

  return isRecord(content) ? content : {};
};

const normalizeStringArray = (value: unknown) => {
  if (!Array.isArray(value)) {
    return [] as string[];
  }

  return value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);
};

const normalizeBlocks = (value: unknown) => {
  if (!Array.isArray(value)) {
    return [] as BlogContentBlock[];
  }

  return value
    .map((item) => {
      if (!isRecord(item)) {
        return null;
      }

      const heading = typeof item.heading === "string" ? item.heading.trim() : "";
      const content = typeof item.content === "string" ? item.content.trim() : "";
      const embeds = normalizeStringArray(item.embeds);
      const images = normalizeStringArray(item.images);

      if (!heading && !content && embeds.length === 0 && images.length === 0) {
        return null;
      }

      return { heading, content, embeds, images };
    })
    .filter((item): item is BlogContentBlock => item !== null);
};

export const normalizeBlogStudioContent = (options: {
  rawContent: Record<string, unknown>;
  fallbackContent: string;
}) => {
  const { rawContent, fallbackContent } = options;
  const blocks = normalizeBlocks(rawContent.blocks);

  if (blocks.length > 0) {
    return { blocks } as BlogStudioContent;
  }

  return {
    blocks: [
      {
        heading: "",
        content: fallbackContent.trim(),
        embeds: [],
        images: [],
      },
    ],
  } as BlogStudioContent;
};

export const sanitizeBlogStudioContent = (
  content: BlogStudioContent,
): BlogStudioContent => ({
  blocks: content.blocks
    .map((block) => ({
      heading: block.heading.trim(),
      content: block.content.trim(),
      embeds: block.embeds.map((embed) => embed.trim()).filter(Boolean),
      images: block.images.map((image) => image.trim()).filter(Boolean),
    }))
    .filter(
      (block) => block.heading || block.content || block.embeds.length > 0 || block.images.length > 0,
    ),
});

