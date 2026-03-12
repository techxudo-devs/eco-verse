"use client";

import { Loader2, MinusCircle, PlusCircle, Save } from "lucide-react";
import { useRef, type ChangeEvent } from "react";
import type { BlogForm } from "./types";
import type { BlogStudioContent } from "@/lib/blogs/studioContent";

type BlogStudioEditorPanelProps = {
  blogForm: BlogForm;
  contentForm: BlogStudioContent;
  isSaving: boolean;
  isUploadingCover: boolean;
  uploadingBlockImage: { blockIndex: number; imageIndex: number } | null;
  actionError: string;
  onExit: () => void;
  onSave: () => void;
  onUploadCover: (file: File) => Promise<void>;
  onUploadBlockImage: (blockIndex: number, imageIndex: number, file: File) => Promise<void>;
  onBlogChange: (
    field: keyof BlogForm,
  ) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  updateBlockField: (
    blockIndex: number,
    field: "heading" | "content",
    value: string,
  ) => void;
  updateBlockEmbed: (blockIndex: number, embedIndex: number, value: string) => void;
  updateBlockImage: (blockIndex: number, imageIndex: number, value: string) => void;
  addBlock: () => void;
  removeBlock: (blockIndex: number) => void;
  addBlockEmbed: (blockIndex: number) => void;
  removeBlockEmbed: (blockIndex: number, embedIndex: number) => void;
  addBlockImage: (blockIndex: number) => void;
  removeBlockImage: (blockIndex: number, imageIndex: number) => void;
};

export default function BlogStudioEditorPanel({
  blogForm,
  contentForm,
  isSaving,
  isUploadingCover,
  uploadingBlockImage,
  actionError,
  onExit,
  onSave,
  onUploadCover,
  onUploadBlockImage,
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
}: BlogStudioEditorPanelProps) {
  const coverFileInputRef = useRef<HTMLInputElement | null>(null);
  const blockImageFileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleCoverUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    await onUploadCover(file);
    event.target.value = "";
  };

  const handleBlockImageUpload =
    (blockIndex: number, imageIndex: number) => async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) {
        return;
      }
      await onUploadBlockImage(blockIndex, imageIndex, file);
      event.target.value = "";
    };

  return (
    <aside
      data-lenis-prevent
      className="border-b border-zinc-200 bg-white 2xl:sticky 2xl:top-16 2xl:self-start 2xl:max-h-[calc(100vh-4rem)] 2xl:overflow-y-auto 2xl:overscroll-y-contain 2xl:border-b-0 2xl:border-r"
    >
      <div className="sticky top-0 z-20 border-b border-zinc-200 bg-white/95 px-5 py-4 backdrop-blur">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-black uppercase tracking-[0.14em] text-zinc-600">
            Blog Studio Editor
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onExit}
              className="rounded-full border border-zinc-300 px-4 py-2 text-xs font-semibold text-zinc-700"
            >
              Exit
            </button>
            <button
              type="button"
              onClick={onSave}
              disabled={isSaving}
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-2 text-xs font-semibold text-white disabled:opacity-60"
            >
              {isSaving ? <Loader2 className="size-3.5 animate-spin" /> : <Save className="size-3.5" />}
              Save
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-6 px-5 py-5">
        {actionError ? (
          <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
            {actionError}
          </p>
        ) : null}

        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-500">Blog Basics</h3>

          <input
            value={blogForm.title}
            onChange={onBlogChange("title")}
            placeholder="Blog title"
            className="w-full rounded-xl border border-zinc-200 px-3 py-2.5 text-sm"
          />

          <input
            value={blogForm.slug}
            onChange={onBlogChange("slug")}
            placeholder="Slug"
            className="w-full rounded-xl border border-zinc-200 px-3 py-2.5 text-sm"
          />

          <input
            value={blogForm.categoryName}
            onChange={onBlogChange("categoryName")}
            placeholder="Category name"
            className="w-full rounded-xl border border-zinc-200 px-3 py-2.5 text-sm"
          />

          <input
            value={blogForm.tags}
            onChange={onBlogChange("tags")}
            placeholder="Tags (comma separated)"
            className="w-full rounded-xl border border-zinc-200 px-3 py-2.5 text-sm"
          />

          <textarea
            value={blogForm.description}
            onChange={onBlogChange("description")}
            rows={3}
            placeholder="Short description"
            className="w-full rounded-xl border border-zinc-200 px-3 py-2.5 text-sm"
          />

          <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
            <input
              value={blogForm.coverImage}
              onChange={onBlogChange("coverImage")}
              placeholder="Cover image URL"
              className="rounded-xl border border-zinc-200 px-3 py-2.5 text-sm"
            />
            <button
              type="button"
              onClick={() => coverFileInputRef.current?.click()}
              disabled={isUploadingCover}
              className="inline-flex items-center rounded-lg border border-zinc-300 px-3 py-2 text-xs font-semibold text-zinc-700 disabled:opacity-60"
            >
              {isUploadingCover ? "Uploading..." : "Upload Cover"}
            </button>
            <input
              ref={coverFileInputRef}
              type="file"
              accept="image/*"
              onChange={handleCoverUpload}
              className="hidden"
            />
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-500">Content Blocks</h3>
            <button
              type="button"
              onClick={addBlock}
              className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-700"
            >
              <PlusCircle className="size-3.5" /> Add Block
            </button>
          </div>

          <div className="space-y-4">
            {contentForm.blocks.map((block, blockIndex) => (
              <div key={`block-${blockIndex}`} className="rounded-xl border border-zinc-200 p-3 space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    value={block.heading}
                    onChange={(event) => updateBlockField(blockIndex, "heading", event.target.value)}
                    placeholder="Block heading"
                    className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => removeBlock(blockIndex)}
                    className="inline-flex items-center justify-center rounded-xl border border-red-200 px-3 py-2 text-red-600"
                  >
                    <MinusCircle className="size-4" />
                  </button>
                </div>

                <textarea
                  value={block.content}
                  onChange={(event) => updateBlockField(blockIndex, "content", event.target.value)}
                  rows={5}
                  placeholder="Block content"
                  className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm"
                />

                <div className="space-y-2 border-t border-zinc-200 pt-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-zinc-500">Images</p>
                    <button
                      type="button"
                      onClick={() => addBlockImage(blockIndex)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-700"
                    >
                      <PlusCircle className="size-3.5" /> Add Image
                    </button>
                  </div>

                  {block.images.map((image, imageIndex) => {
                    const inputKey = `${blockIndex}-${imageIndex}`;
                    const isUploadingThisImage =
                      uploadingBlockImage?.blockIndex === blockIndex &&
                      uploadingBlockImage.imageIndex === imageIndex;

                    return (
                      <div key={`block-${blockIndex}-image-${imageIndex}`} className="grid gap-2 sm:grid-cols-[1fr_auto_auto]">
                        <input
                          value={image}
                          onChange={(event) =>
                            updateBlockImage(blockIndex, imageIndex, event.target.value)
                          }
                          placeholder="Image URL"
                          className="rounded-xl border border-zinc-200 px-3 py-2 text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => blockImageFileInputRefs.current[inputKey]?.click()}
                          disabled={isUploadingThisImage}
                          className="inline-flex items-center justify-center rounded-xl border border-zinc-300 px-3 py-2 text-xs font-semibold text-zinc-700 disabled:opacity-60"
                        >
                          {isUploadingThisImage ? "Uploading..." : "Upload"}
                        </button>
                        <input
                          ref={(element) => {
                            blockImageFileInputRefs.current[inputKey] = element;
                          }}
                          type="file"
                          accept="image/*"
                          onChange={handleBlockImageUpload(blockIndex, imageIndex)}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => removeBlockImage(blockIndex, imageIndex)}
                          className="inline-flex items-center justify-center rounded-xl border border-red-200 px-3 py-2 text-red-600"
                        >
                          <MinusCircle className="size-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-2 border-t border-zinc-200 pt-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-zinc-500">Embeds</p>
                    <button
                      type="button"
                      onClick={() => addBlockEmbed(blockIndex)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-700"
                    >
                      <PlusCircle className="size-3.5" /> Add Embed
                    </button>
                  </div>

                  {block.embeds.map((embed, embedIndex) => (
                    <div key={`block-${blockIndex}-embed-${embedIndex}`} className="grid gap-2 sm:grid-cols-[1fr_auto]">
                      <input
                        value={embed}
                        onChange={(event) =>
                          updateBlockEmbed(blockIndex, embedIndex, event.target.value)
                        }
                        placeholder="Instagram or YouTube URL"
                        className="rounded-xl border border-zinc-200 px-3 py-2 text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => removeBlockEmbed(blockIndex, embedIndex)}
                        className="inline-flex items-center justify-center rounded-xl border border-red-200 px-3 py-2 text-red-600"
                      >
                        <MinusCircle className="size-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
