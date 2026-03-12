import type { BlogStudioContent } from "@/lib/blogs/studioContent";

export type BlogForm = {
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  tags: string;
  categoryName: string;
};

export const emptyBlogForm: BlogForm = {
  title: "",
  slug: "",
  description: "",
  coverImage: "",
  tags: "",
  categoryName: "General",
};

export const emptyBlogStudioContent: BlogStudioContent = {
  blocks: [],
};

