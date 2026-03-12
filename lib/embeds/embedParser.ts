export type EmbedProvider = "instagram" | "youtube";

export type EmbedData = {
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

export const toEmbedData = (value: string): EmbedData | null => {
  const trimmed = value.trim();
  if (!trimmed) {
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

    if (!contentType || !postId || !["p", "reel", "tv"].includes(contentType)) {
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

