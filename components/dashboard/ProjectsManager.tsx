"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ImageIcon, Pencil, PlusCircle, RotateCcw, Save, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/app/generated/prisma/client";
import { useCreateProject, useDeleteProject, useProjects, useUpdateProject } from "@/lib/hooks/useProjects";
import { parseProjectPayload } from "@/lib/projects/projectPayload";
import { uploadImageToCloudinary } from "@/lib/utils/cloudinary";
import type { ChangeEvent, FormEvent } from "react";

type ProjectFormState = {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  tags: string;
  coverImage: string;
  galleryImages: string;
};

const defaultFormState: ProjectFormState = {
  title: "",
  slug: "",
  shortDescription: "",
  description: "",
  tags: "",
  coverImage: "",
  galleryImages: "",
};

const toSlug = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

export default function ProjectsManager() {
  const { data, isLoading, error, refetch } = useProjects();
  const projects = useMemo(() => (data ?? []) as Project[], [data]);
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();

  const [panelOpen, setPanelOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
  const [formState, setFormState] = useState<ProjectFormState>(defaultFormState);
  const [formError, setFormError] = useState<string>("");
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const coverFileInputRef = useRef<HTMLInputElement | null>(null);
  const panelTopRef = useRef<HTMLDivElement | null>(null);

  const isMutationPending = createProject.isPending || updateProject.isPending || deleteProject.isPending;
  const isFormBusy = isMutationPending || isUploadingCover;

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === editingProjectId) ?? null,
    [projects, editingProjectId],
  );

  useEffect(() => {
    if (!panelOpen || editingProjectId) {
      return;
    }

    panelTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [panelOpen, editingProjectId]);

  const resetPanel = () => {
    setEditingProjectId(null);
    setFormState(defaultFormState);
    setFormError("");
    setPanelOpen(false);
  };

  const startCreate = () => {
    setEditingProjectId(null);
    setFormState(defaultFormState);
    setFormError("");
    setPanelOpen(true);
  };

  const startEdit = (project: Project) => {
    setEditingProjectId(project.id);
    setFormError("");
    setFormState({
      title: project.title ?? "",
      slug: project.slug ?? "",
      shortDescription: project.shortDescription ?? "",
      description: project.description ?? "",
      tags: (project.tags ?? []).join(", "),
      coverImage: project.coverImage ?? "",
      galleryImages: (project.galleryImages ?? []).join(", "),
    });
    setPanelOpen(true);
  };

  const submitProject = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    try {
      const title = formState.title.trim();
      const payload = parseProjectPayload({
        ...formState,
        slug: formState.slug.trim() || toSlug(title),
      });

      if (!payload.title || !payload.coverImage) {
        setFormError("Title and cover image are required.");
        return;
      }

      if (!payload.slug) {
        setFormError("Please enter a valid title to generate slug.");
        return;
      }

      if (editingProjectId) {
        await updateProject.mutateAsync({ id: editingProjectId, ...payload });
      } else {
        await createProject.mutateAsync(payload);
      }

      resetPanel();
      await refetch();
    } catch {
      setFormError("Unable to save this project right now.");
    }
  };

  const submitDelete = async (projectId: number) => {
    try {
      setFormError("");
      await deleteProject.mutateAsync(projectId);
      if (editingProjectId === projectId) {
        resetPanel();
      }
      await refetch();
    } catch {
      setFormError("Unable to remove this project right now.");
    }
  };

  const submitReset = () => {
    if (!selectedProject) {
      return;
    }

    setFormState({
      title: selectedProject.title ?? "",
      slug: selectedProject.slug ?? "",
      shortDescription: selectedProject.shortDescription ?? "",
      description: selectedProject.description ?? "",
      tags: (selectedProject.tags ?? []).join(", "),
      coverImage: selectedProject.coverImage ?? "",
      galleryImages: (selectedProject.galleryImages ?? []).join(", "),
    });
  };

  const updateField = (field: keyof ProjectFormState) => (value: string) => {
    setFormState((previous) => ({ ...previous, [field]: value }));
  };

  const onCoverUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      setIsUploadingCover(true);
      setFormError("");
      const secureUrl = await uploadImageToCloudinary(file);
      updateField("coverImage")(secureUrl);
    } catch {
      setFormError("Image upload failed. Please check Cloudinary configuration.");
    } finally {
      setIsUploadingCover(false);
      event.target.value = "";
    }
  };

  const shortDescriptionCount = formState.shortDescription.trim().length;

  return (
    <section className="min-h-screen space-y-8 bg-[#FFEDD5] px-6 py-12 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <div className="inline-block rounded-full bg-[#00522D] px-4 py-2">
            <p className="font-clash text-xs font-bold uppercase tracking-[0.2em] text-white">Projects</p>
          </div>
          <h2 className="mt-4 font-beni text-5xl font-black uppercase leading-tight text-[#00522D] md:text-6xl">
            Portfolio Hub
          </h2>
          <p className="mt-2 font-clash text-sm font-medium text-zinc-700">
            Add, edit, and manage portfolio entries quickly.
          </p>
        </div>

        <button
          className="inline-flex items-center gap-2 rounded-full bg-[#F97316] px-6 py-3 font-clash text-sm font-bold uppercase tracking-[0.14em] text-white shadow-lg transition-all hover:scale-105 hover:bg-[#ff6b35]"
          onClick={startCreate}
          type="button"
        >
          <PlusCircle className="size-5" />
          Add Project
        </button>
      </motion.div>

      <div ref={panelTopRef} />

      {panelOpen && !editingProjectId ? (
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 60, damping: 20 }}
          className="rounded-3xl border-2 border-[#F97316]/20 bg-white p-6 shadow-xl md:p-8"
        >
          <form onSubmit={submitProject} className="grid gap-5">
            <div className="flex items-center justify-between">
              <h3 className="font-beni text-2xl font-black uppercase text-[#00522D]">Create New Project</h3>
              <button
                type="button"
                onClick={resetPanel}
                className="inline-flex items-center rounded-full border-2 border-zinc-300 px-4 py-2 font-clash text-xs font-bold uppercase text-zinc-700 transition hover:border-[#00522D] hover:bg-zinc-100"
              >
                Close
              </button>
            </div>

            {formError ? (
              <p className="rounded-xl bg-red-50 px-4 py-3 font-clash text-sm font-semibold text-red-600">
                {formError}
              </p>
            ) : null}

            <label className="grid gap-2">
              <span className="font-clash text-xs font-bold uppercase tracking-[0.18em] text-[#00522D]">Title</span>
              <input
                value={formState.title}
                onChange={(event) => {
                  const value = event.target.value;
                  setFormState((prev) => ({
                    ...prev,
                    title: value,
                    slug: editingProjectId ? prev.slug : toSlug(value),
                  }));
                }}
                className="w-full rounded-xl border-2 border-zinc-200 bg-zinc-50 px-4 py-3 font-clash outline-none transition focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/30"
                required
                placeholder="Project title"
              />
            </label>

            <label className="grid gap-2">
              <span className="font-clash text-xs font-bold uppercase tracking-[0.18em] text-[#00522D]">
                Cover Image
              </span>
              <div className="flex gap-2">
                <input
                  value={formState.coverImage}
                  onChange={(event) => updateField("coverImage")(event.target.value)}
                  className="w-full rounded-xl border-2 border-zinc-200 bg-zinc-50 px-4 py-3 font-clash outline-none transition focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/30"
                  placeholder="https://..."
                  required
                />
                <button
                  type="button"
                  disabled={isUploadingCover}
                  onClick={() => coverFileInputRef.current?.click()}
                  className="rounded-xl bg-[#15803d] px-4 font-clash text-xs font-bold uppercase text-white transition hover:bg-[#00522D] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isUploadingCover ? "Uploading..." : "Upload"}
                </button>
                <input
                  ref={coverFileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={onCoverUpload}
                  className="hidden"
                />
              </div>
              {formState.coverImage.trim() ? (
                <div className="mt-2 overflow-hidden rounded-2xl border-2 border-zinc-200">
                  <img
                    src={formState.coverImage}
                    alt="Project cover preview"
                    className="aspect-video w-full object-cover"
                  />
                </div>
              ) : null}
            </label>

            <label className="grid gap-2">
              <div className="flex items-center justify-between">
                <span className="font-clash text-xs font-bold uppercase tracking-[0.18em] text-[#00522D]">
                  Short Description
                </span>
                <span className="font-clash text-xs font-semibold text-zinc-500">{shortDescriptionCount} chars</span>
              </div>
              <textarea
                value={formState.shortDescription}
                onChange={(event) => updateField("shortDescription")(event.target.value)}
                className="min-h-24 rounded-xl border-2 border-zinc-200 bg-zinc-50 px-4 py-3 font-clash outline-none transition focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/30"
                placeholder="Quick summary for this project"
              />
            </label>

            <label className="grid gap-2">
              <span className="font-clash text-xs font-bold uppercase tracking-[0.18em] text-[#00522D]">
                Tags (comma separated)
              </span>
              <input
                value={formState.tags}
                onChange={(event) => updateField("tags")(event.target.value)}
                className="w-full rounded-xl border-2 border-zinc-200 bg-zinc-50 px-4 py-3 font-clash outline-none transition focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/30"
                placeholder="ux, app, design"
              />
            </label>

            <button
              type="submit"
              disabled={isFormBusy}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-[#F97316] px-6 py-4 font-clash text-sm font-bold uppercase tracking-[0.12em] text-white shadow-lg transition-all hover:scale-105 hover:bg-[#ff6b35] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isFormBusy ? (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="mr-2 inline-block"
                >
                  <RotateCcw className="size-5" />
                </motion.span>
              ) : (
                <Save className="mr-2 size-5" />
              )}
              <span>Create Project</span>
              <Check className="ml-2 size-5" />
            </button>
          </form>
        </motion.div>
      ) : null}

      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="aspect-square animate-pulse rounded-3xl border-2 border-zinc-200 bg-white shadow-lg"
            />
          ))}
        </div>
      ) : (
        <>
          {error ? (
            <p className="rounded-3xl border-2 border-red-300 bg-red-50 px-6 py-4 font-clash text-sm font-semibold text-red-700 shadow-lg">
              Unable to load projects.
            </p>
          ) : null}

          {projects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-3xl border-2 border-dashed border-[#F97316]/30 bg-white/50 px-8 py-16 text-center shadow-lg backdrop-blur-sm"
            >
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#F97316]/10">
                <ImageIcon className="h-10 w-10 text-[#F97316]" />
              </div>
              <h3 className="font-beni text-2xl font-bold uppercase text-[#00522D]">No Projects Yet</h3>
              <p className="mt-2 font-clash text-sm text-zinc-600">
                Click <span className="font-bold text-[#F97316]">Add Project</span> to create your first portfolio item.
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } }}
              className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            >
              {projects.map((project) => {
                const isSelected = editingProjectId === project.id && panelOpen;
                return (
                  <motion.article
                    key={project.id}
                    variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                    whileHover={{ y: -2, scale: 1.01 }}
                    className={`group rounded-xl border bg-white p-2.5 transition ${
                      isSelected
                        ? "border-[var(--color-green)]/35 bg-[var(--color-green)]/10"
                        : "border-zinc-200 hover:border-[var(--color-primary)]/60"
                    }`}
                  >
                    <div className="relative mb-2 aspect-square overflow-hidden rounded-lg bg-zinc-100">
                      {project.coverImage ? (
                        <Image
                          src={project.coverImage}
                          alt={project.title}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-105"
                          unoptimized
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-zinc-100 text-zinc-400">
                          <ImageIcon className="size-10" />
                        </div>
                      )}
                    </div>

                    <p className="line-clamp-2 text-sm font-black text-[var(--foreground)]">{project.title}</p>

                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-zinc-700">
                      {project.shortDescription || "No summary added yet."}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {(project.tags ?? []).slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-zinc-200 bg-zinc-50 px-1.5 py-0.5 text-[10px] text-zinc-700"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-3 flex gap-1.5">
                      <Link
                        href={`/dashboard/projects/${project.id}`}
                        className="inline-flex flex-1 items-center justify-center rounded-md border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/8 py-1.5 text-xs font-semibold text-[var(--foreground)] transition hover:border-[var(--color-primary)]/60"
                      >
                        Case Study
                      </Link>
                      <button
                        onClick={() => startEdit(project)}
                        type="button"
                        className="inline-flex flex-1 items-center justify-center rounded-md border border-zinc-300 bg-zinc-50 py-1.5 text-xs font-semibold text-zinc-700 transition hover:border-[var(--color-primary)] hover:text-[var(--foreground)]"
                      >
                        <Pencil className="mr-1 size-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => submitDelete(project.id)}
                        type="button"
                        className="inline-flex flex-1 items-center justify-center rounded-md border border-red-200 bg-red-50 py-1.5 text-xs font-semibold text-red-700 transition hover:border-red-400 hover:bg-red-100"
                        disabled={isMutationPending}
                      >
                        <Trash2 className="mr-1 size-3.5" /> Delete
                      </button>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          )}
        </>
      )}

      {panelOpen && editingProjectId ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 pt-10 md:pt-16">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xl"
          >
            <form onSubmit={submitProject} className="grid gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black uppercase tracking-[0.18em] text-zinc-600">Update Project</h3>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={submitReset}
                    className="inline-flex items-center gap-1 rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-semibold text-zinc-700"
                  >
                    <RotateCcw className="size-3.5" /> Reset
                  </button>
                  <button
                    type="button"
                    onClick={resetPanel}
                    className="inline-flex items-center rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-semibold text-zinc-700"
                  >
                    Close
                  </button>
                </div>
              </div>

              {formError ? <p className="text-sm text-red-600">{formError}</p> : null}

              <label className="grid gap-1 text-sm">
                <span className="text-xs uppercase tracking-[0.18em] text-zinc-500">Title</span>
                <input
                  value={formState.title}
                  onChange={(event) => {
                    const value = event.target.value;
                    setFormState((prev) => ({
                      ...prev,
                      title: value,
                      slug: editingProjectId ? prev.slug : toSlug(value),
                    }));
                  }}
                  className="w-full border border-zinc-300 bg-zinc-50 px-3 py-2 outline-none transition focus:border-[var(--color-green)] focus:ring-2 focus:ring-[var(--color-green)]/30"
                  required
                  placeholder="Project title"
                />
              </label>

              <label className="grid gap-1 text-sm">
                <span className="text-xs uppercase tracking-[0.18em] text-zinc-500">Cover Image</span>
                <div className="flex gap-2">
                  <input
                    value={formState.coverImage}
                    onChange={(event) => updateField("coverImage")(event.target.value)}
                    className="w-full border border-zinc-300 bg-zinc-50 px-3 py-2 outline-none transition focus:border-[var(--color-green)] focus:ring-2 focus:ring-[var(--color-green)]/30"
                    placeholder="https://..."
                    required
                  />
                  <button
                    type="button"
                    disabled={isUploadingCover}
                    onClick={() => coverFileInputRef.current?.click()}
                    className="rounded-lg border border-[var(--color-green)]/30 bg-[var(--color-green)]/8 px-3 text-xs font-semibold text-[var(--foreground)] transition hover:bg-[var(--color-green)]/16 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isUploadingCover ? "Uploading..." : "Upload"}
                  </button>
                  <input
                    ref={coverFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={onCoverUpload}
                    className="hidden"
                  />
                </div>
                {formState.coverImage.trim() ? (
                  <div className="mt-2 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50">
                    <img
                      src={formState.coverImage}
                      alt="Project cover preview"
                      className="aspect-video w-full object-cover"
                    />
                  </div>
                ) : null}
              </label>

              <label className="grid gap-1 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.18em] text-zinc-500">Short Description</span>
                  <span className="text-xs text-zinc-500">{shortDescriptionCount} chars</span>
                </div>
                <textarea
                  value={formState.shortDescription}
                  onChange={(event) => updateField("shortDescription")(event.target.value)}
                  className="min-h-24 border border-zinc-300 bg-zinc-50 px-3 py-2 outline-none transition focus:border-[var(--color-green)] focus:ring-2 focus:ring-[var(--color-green)]/30"
                  placeholder="Quick summary for this project"
                />
              </label>

              <label className="grid gap-1 text-sm">
                <span className="text-xs uppercase tracking-[0.18em] text-zinc-500">Tags (comma separated)</span>
                <input
                  value={formState.tags}
                  onChange={(event) => updateField("tags")(event.target.value)}
                  className="w-full border border-zinc-300 bg-zinc-50 px-3 py-2 outline-none transition focus:border-[var(--color-green)] focus:ring-2 focus:ring-[var(--color-green)]/30"
                  placeholder="ux, app, design"
                />
              </label>

              <button
                type="submit"
                disabled={isFormBusy}
                className="inline-flex items-center justify-center rounded-xl border border-[var(--color-green)] bg-[var(--color-green)]/10 px-4 py-2.5 text-sm font-bold tracking-[0.12em] text-[var(--foreground)] transition hover:bg-[var(--color-green)]/20"
              >
                {isFormBusy ? (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="mr-2 inline-block"
                  >
                    <RotateCcw className="size-4" />
                  </motion.span>
                ) : (
                  <Save className="mr-2 size-4" />
                )}
                <span>Save Changes</span>
                <Check className="ml-2 size-4" />
              </button>
            </form>
          </motion.div>
        </div>
      ) : null}
    </section>
  );
}
