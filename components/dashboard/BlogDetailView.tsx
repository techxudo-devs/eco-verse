"use client";

import Link from "next/link";
import { ArrowLeft, Loader2, Pencil, Save } from "lucide-react";
import BlogArticle from "@/components/blog/BlogArticle";
import BlogStudioEditorPanel from "@/components/dashboard/blog-detail/BlogStudioEditorPanel";
import { useBlog, useUpdateBlog } from "@/lib/hooks/useBlogs";
import { useBlogStudioEditor } from "@/components/dashboard/blog-detail/useBlogStudioEditor";

type Props = {
  blogId: number;
};

export default function BlogDetailView({ blogId }: Props) {
  const { data: blog, isLoading, error } = useBlog(blogId);
  const updateBlog = useUpdateBlog();

  const editor = useBlogStudioEditor({
    blog,
    onSave: async (payload) => {
      await updateBlog.mutateAsync(payload);
    },
  });

  if (isLoading) {
    return <div className="h-72 animate-pulse rounded-2xl bg-zinc-200" />;
  }

  if (error || !blog) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
        <p className="text-sm font-semibold">Blog not found.</p>
        <Link
          href="/dashboard/blogs"
          className="mt-3 inline-flex text-sm underline"
        >
          Back to blogs
        </Link>
      </div>
    );
  }

  if (editor.isEditing) {
    return (
      <div className="bg-[#efefef] px-3 py-4 md:px-6 xl:px-8 2xl:px-16">
        <section className="grid grid-cols-1 rounded-2xl border border-zinc-200 bg-white 2xl:grid-cols-[24rem_minmax(0,1fr)]">
          <BlogStudioEditorPanel
            blogForm={editor.blogForm}
            contentForm={editor.contentForm}
            isSaving={editor.isSaving}
            isUploadingCover={editor.isUploadingCover}
            uploadingBlockImage={editor.uploadingBlockImage}
            actionError={editor.actionError}
            onExit={editor.closeEditor}
            onSave={editor.saveBlog}
            onUploadCover={editor.uploadCoverImage}
            onUploadBlockImage={editor.uploadBlockImage}
            onBlogChange={editor.onBlogChange}
            updateBlockField={editor.updateBlockField}
            updateBlockEmbed={editor.updateBlockEmbed}
            updateBlockImage={editor.updateBlockImage}
            addBlock={editor.addBlock}
            removeBlock={editor.removeBlock}
            addBlockEmbed={editor.addBlockEmbed}
            removeBlockEmbed={editor.removeBlockEmbed}
            addBlockImage={editor.addBlockImage}
            removeBlockImage={editor.removeBlockImage}
          />

          <div>
            <BlogArticle
              className="w-full px-6 py-8 md:px-10"
              showBackLink={false}
              title={editor.blogForm.title}
              coverImage={editor.blogForm.coverImage}
              description={editor.blogForm.description}
              content={editor.contentForm}
              tags={editor.tags}
              meta={
                <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                  {editor.blogForm.categoryName || "General"}
                </p>
              }
              actions={
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center rounded-full bg-black/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white">
                    Live Preview
                  </span>
                  <button
                    type="button"
                    onClick={editor.saveBlog}
                    disabled={editor.isSaving}
                    className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-2 text-xs font-semibold text-white disabled:opacity-60"
                  >
                    {editor.isSaving ? (
                      <Loader2 className="size-3.5 animate-spin" />
                    ) : (
                      <Save className="size-3.5" />
                    )}
                    Save
                  </button>
                </div>
              }
            />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="mx-6 my-6 bg-[#efefef] pb-10">
      <BlogArticle
        className="w-full px-6 py-16 md:px-10"
        showBackLink={false}
        title={editor.blogForm.title}
        coverImage={editor.blogForm.coverImage}
        description={editor.blogForm.description}
        content={editor.contentForm}
        tags={editor.tags}
        meta={
          <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
            {editor.blogForm.categoryName || "General"} •{" "}
            {new Date(blog.updatedAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        }
        actions={
          <div className="mb-8 flex items-center justify-between gap-3">
            <Link
              href="/dashboard/blogs"
              className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-zinc-700"
            >
              <ArrowLeft className="size-4" /> Back
            </Link>
            <button
              type="button"
              onClick={editor.openEditor}
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white"
            >
              <Pencil className="size-3.5" /> Edit Blog
            </button>
          </div>
        }
      />
    </div>
  );
}
