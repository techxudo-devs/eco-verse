"use client";

import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import {
  type BlogStudioContent,
  normalizeBlogStudioContent,
  sanitizeBlogStudioContent,
  toBlogContentRecord,
} from "@/lib/blogs/studioContent";
import { uploadImageToCloudinary } from "@/lib/utils/cloudinary";
import { emptyBlogForm, emptyBlogStudioContent, type BlogForm } from "./types";

type BlogWithCategory = {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  coverImage: string | null;
  content: string;
  tags: string[];
  category?: {
    name?: string;
  } | null;
};

type SavePayload = {
  id: number;
  title: string;
  slug: string;
  description?: string;
  coverImage?: string;
  content: string;
  tags: string[];
  categoryName: string;
  published: boolean;
};

type UseBlogStudioEditorOptions = {
  blog: BlogWithCategory | null | undefined;
  onSave: (payload: SavePayload) => Promise<unknown>;
};

const toSlug = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

const hydrateFromBlog = (blog: BlogWithCategory) => {
  const rawContent = toBlogContentRecord(blog.content);

  const blogForm: BlogForm = {
    title: blog.title ?? "",
    slug: blog.slug ?? "",
    description: blog.description ?? "",
    coverImage: blog.coverImage ?? "",
    tags: (blog.tags ?? []).join(", "),
    categoryName: blog.category?.name ?? "General",
  };

  const contentForm = normalizeBlogStudioContent({
    rawContent,
    fallbackContent: blog.content ?? "",
  });

  return { blogForm, contentForm, rawContent };
};

export const useBlogStudioEditor = ({ blog, onSave }: UseBlogStudioEditorOptions) => {
  const [blogForm, setBlogForm] = useState<BlogForm>(emptyBlogForm);
  const [contentForm, setContentForm] = useState<BlogStudioContent>(emptyBlogStudioContent);
  const [rawContent, setRawContent] = useState<Record<string, unknown>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [uploadingBlockImage, setUploadingBlockImage] = useState<{
    blockIndex: number;
    imageIndex: number;
  } | null>(null);
  const [actionError, setActionError] = useState("");

  useEffect(() => {
    if (!blog) {
      return;
    }

    const nextState = hydrateFromBlog(blog);
    setBlogForm(nextState.blogForm);
    setContentForm(nextState.contentForm);
    setRawContent(nextState.rawContent);
  }, [blog]);

  const tags = useMemo(
    () =>
      blogForm.tags
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean),
    [blogForm.tags],
  );

  const onBlogChange =
    (field: keyof BlogForm) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;

      setBlogForm((previous) => {
        if (field !== "title") {
          return { ...previous, [field]: value };
        }

        return {
          ...previous,
          title: value,
          slug: previous.slug ? previous.slug : toSlug(value),
        };
      });
    };

  const updateBlockField = (
    blockIndex: number,
    field: "heading" | "content",
    value: string,
  ) => {
    setContentForm((previous) => ({
      ...previous,
      blocks: previous.blocks.map((block, currentIndex) =>
        currentIndex === blockIndex ? { ...block, [field]: value } : block,
      ),
    }));
  };

  const updateBlockEmbed = (blockIndex: number, embedIndex: number, value: string) => {
    setContentForm((previous) => ({
      ...previous,
      blocks: previous.blocks.map((block, currentIndex) => {
        if (currentIndex !== blockIndex) {
          return block;
        }

        return {
          ...block,
          embeds: block.embeds.map((embed, currentEmbedIndex) =>
            currentEmbedIndex === embedIndex ? value : embed,
          ),
        };
      }),
    }));
  };

  const updateBlockImage = (blockIndex: number, imageIndex: number, value: string) => {
    setContentForm((previous) => ({
      ...previous,
      blocks: previous.blocks.map((block, currentIndex) => {
        if (currentIndex !== blockIndex) {
          return block;
        }

        return {
          ...block,
          images: block.images.map((image, currentImageIndex) =>
            currentImageIndex === imageIndex ? value : image,
          ),
        };
      }),
    }));
  };

  const addBlock = () => {
    setContentForm((previous) => ({
      ...previous,
      blocks: [...previous.blocks, { heading: "", content: "", embeds: [], images: [] }],
    }));
  };

  const removeBlock = (blockIndex: number) => {
    setContentForm((previous) => ({
      ...previous,
      blocks: previous.blocks.filter((_, currentIndex) => currentIndex !== blockIndex),
    }));
  };

  const addBlockEmbed = (blockIndex: number) => {
    setContentForm((previous) => ({
      ...previous,
      blocks: previous.blocks.map((block, currentIndex) =>
        currentIndex === blockIndex ? { ...block, embeds: [...block.embeds, ""] } : block,
      ),
    }));
  };

  const removeBlockEmbed = (blockIndex: number, embedIndex: number) => {
    setContentForm((previous) => ({
      ...previous,
      blocks: previous.blocks.map((block, currentIndex) => {
        if (currentIndex !== blockIndex) {
          return block;
        }

        return {
          ...block,
          embeds: block.embeds.filter((_, currentEmbedIndex) => currentEmbedIndex !== embedIndex),
        };
      }),
    }));
  };

  const addBlockImage = (blockIndex: number) => {
    setContentForm((previous) => ({
      ...previous,
      blocks: previous.blocks.map((block, currentIndex) =>
        currentIndex === blockIndex ? { ...block, images: [...block.images, ""] } : block,
      ),
    }));
  };

  const removeBlockImage = (blockIndex: number, imageIndex: number) => {
    setContentForm((previous) => ({
      ...previous,
      blocks: previous.blocks.map((block, currentIndex) => {
        if (currentIndex !== blockIndex) {
          return block;
        }

        return {
          ...block,
          images: block.images.filter((_, currentImageIndex) => currentImageIndex !== imageIndex),
        };
      }),
    }));
  };

  const resetDraft = () => {
    if (!blog) {
      return;
    }

    const nextState = hydrateFromBlog(blog);
    setBlogForm(nextState.blogForm);
    setContentForm(nextState.contentForm);
    setRawContent(nextState.rawContent);
    setActionError("");
  };

  const openEditor = () => {
    resetDraft();
    setIsEditing(true);
  };

  const closeEditor = () => {
    resetDraft();
    setIsEditing(false);
  };

  const saveBlog = async () => {
    if (!blog) {
      return;
    }

    setActionError("");
    setIsSaving(true);

    try {
      const nextContent = sanitizeBlogStudioContent(contentForm);
      const payloadContent: Record<string, unknown> = {
        ...rawContent,
        blocks: nextContent.blocks,
      };

      await onSave({
        id: blog.id,
        title: blogForm.title.trim(),
        slug: blogForm.slug.trim() || toSlug(blogForm.title),
        description: blogForm.description.trim(),
        coverImage: blogForm.coverImage.trim(),
        content: JSON.stringify(payloadContent),
        tags,
        categoryName: blogForm.categoryName.trim() || "General",
        published: false,
      });

      setContentForm(nextContent);
      setRawContent(payloadContent);
      setIsEditing(false);
    } catch {
      setActionError("Could not save this blog right now.");
    } finally {
      setIsSaving(false);
    }
  };

  const uploadCoverImage = async (file: File) => {
    try {
      setActionError("");
      setIsUploadingCover(true);
      const secureUrl = await uploadImageToCloudinary(file);
      setBlogForm((previous) => ({ ...previous, coverImage: secureUrl }));
    } catch {
      setActionError("Image upload failed. Please check Cloudinary configuration.");
    } finally {
      setIsUploadingCover(false);
    }
  };

  const uploadBlockImage = async (blockIndex: number, imageIndex: number, file: File) => {
    try {
      setActionError("");
      setUploadingBlockImage({ blockIndex, imageIndex });
      const secureUrl = await uploadImageToCloudinary(file);
      updateBlockImage(blockIndex, imageIndex, secureUrl);
    } catch {
      setActionError("Image upload failed. Please check Cloudinary configuration.");
    } finally {
      setUploadingBlockImage(null);
    }
  };

  return {
    blogForm,
    contentForm,
    isEditing,
    isSaving,
    isUploadingCover,
    uploadingBlockImage,
    actionError,
    tags,
    onBlogChange,
    updateBlockField,
    updateBlockEmbed,
    updateBlockImage,
    addBlock,
    removeBlock,
    addBlockEmbed,
    removeBlockEmbed,
    addBlockImage,
    removeBlockImage,
    resetDraft,
    openEditor,
    closeEditor,
    saveBlog,
    uploadCoverImage,
    uploadBlockImage,
  };
};

