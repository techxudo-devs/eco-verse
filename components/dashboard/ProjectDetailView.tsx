"use client";

import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Edit3,
  ImageIcon,
  Loader2,
  Megaphone,
  Rocket,
  Sparkles,
  TrendingUp,
  ZoomIn,
} from "lucide-react";
import type { Project } from "@/app/generated/prisma/client";
import { useProject, useUpdateProject } from "@/lib/hooks/useProjects";
import ImageLightbox from "./ImageLightbox";

type Props = {
  projectId: number;
};

type ProjectPayload = {
  title: string;
  shortDescription: string;
  description: string;
  tags: string[];
  coverImage: string;
  galleryImages: string[];
};

const emptyProjectPayload: ProjectPayload = {
  title: "",
  shortDescription: "",
  description: "",
  tags: [],
  coverImage: "",
  galleryImages: [],
};

const toEditForm = (project: ProjectPayload) => ({
  title: project.title,
  shortDescription: project.shortDescription,
  description: project.description,
  tags: project.tags.join(", "),
  coverImage: project.coverImage,
  galleryImages: project.galleryImages.join(", "),
});

const asProjectPayload = (project: Project): ProjectPayload => ({
  title: project.title ?? "",
  shortDescription: project.shortDescription ?? "",
  description: project.description ?? "",
  tags: (project.tags ?? []).filter(Boolean),
  coverImage: project.coverImage ?? "",
  galleryImages: (project.galleryImages ?? []).filter(Boolean),
});

const normalizeContent = (content: Project["content"]) => {
  if (!content) {
    return {} as Record<string, unknown>;
  }
  if (typeof content === "string") {
    try {
      const parsed = JSON.parse(content);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        return parsed as Record<string, unknown>;
      }
      return { value: parsed };
    } catch {
      return { value: content };
    }
  }
  if (Array.isArray(content)) {
    return { value: content };
  }
  return content as Record<string, unknown>;
};

export default function ProjectDetailView({ projectId }: Props) {
  const { data: project, isLoading, error } = useProject(projectId);
  const updateProject = useUpdateProject();

  const [projectState, setProjectState] = useState<ProjectPayload>(
    emptyProjectPayload,
  );
  const [contentState, setContentState] = useState<Record<string, unknown>>({});
  const [editForm, setEditForm] = useState(() => toEditForm(emptyProjectPayload));
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [actionError, setActionError] = useState("");

  useEffect(() => {
    if (!project) {
      return;
    }

    const nextProjectState = asProjectPayload(project);
    setProjectState(nextProjectState);
    setEditForm(toEditForm(nextProjectState));
    setContentState(normalizeContent(project.content));
  }, [project]);

  const createdDate = project
    ? new Date(project.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      })
    : "—";
  const updatedDate = project
    ? new Date(project.updatedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "—";

  const descriptionParagraphs = useMemo(
    () =>
      (projectState.description ?? "")
        .split(/\n\n+/)
        .map((value) => value.trim())
        .filter(Boolean),
    [projectState.description],
  );

  const gallery = projectState.galleryImages;
  const tags = projectState.tags;
  const publishState =
    typeof contentState.workflow === "object" &&
    contentState.workflow !== null &&
    (contentState.workflow as { published?: boolean }).published === true;
  const publishDate =
    typeof contentState.workflow === "object" &&
    contentState.workflow !== null
      ? (contentState.workflow as { publishedAt?: string }).publishedAt
      : undefined;

  const onEditChange =
    (field: keyof typeof editForm) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setEditForm((previous) => ({ ...previous, [field]: event.target.value }));
    };

  const saveEdits = async () => {
    if (!project) {
      return;
    }
    setActionError("");
    setIsSaving(true);
    try {
      const payload = {
        title: editForm.title.trim(),
        shortDescription: editForm.shortDescription.trim(),
        description: editForm.description.trim(),
        coverImage: editForm.coverImage.trim(),
        tags: editForm.tags
          .split(",")
          .map((value) => value.trim())
          .filter(Boolean),
        galleryImages: editForm.galleryImages
          .split(",")
          .map((value) => value.trim())
          .filter(Boolean),
      };

      await updateProject.mutateAsync({ id: project.id, ...payload });
      setProjectState(payload);
      setIsEditOpen(false);
    } catch {
      setActionError("Could not save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const publishCaseStudy = async () => {
    if (!project || publishState) {
      return;
    }
    setActionError("");
    setIsPublishing(true);
    try {
      const nextContent = {
        ...contentState,
        workflow: {
          ...((contentState.workflow as Record<string, unknown>) ?? {}),
          published: true,
          publishedAt: new Date().toISOString(),
          format: "marketing-case-study",
        },
      };

      await updateProject.mutateAsync({
        id: project.id,
        content: JSON.stringify(nextContent),
      });
      setContentState(nextContent);
    } catch {
      setActionError("Publish failed. Please try again.");
    } finally {
      setIsPublishing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-72 animate-pulse rounded-3xl bg-zinc-200" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-24 animate-pulse rounded-2xl bg-zinc-200"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
        <p className="text-sm font-semibold">Project not found.</p>
        <Link href="/dashboard/projects" className="mt-3 inline-flex text-sm underline">
          Back to projects
        </Link>
      </div>
    );
  }

  return (
    <>
      <AnimatePresence>
        {lightboxOpen && (
          <ImageLightbox
            images={gallery}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.div className="-mx-6 -my-6 min-h-screen bg-[#f5f0eb]" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="relative h-[68vh] min-h-[360px] overflow-hidden">
          {projectState.coverImage ? (
            <Image src={projectState.coverImage} alt={projectState.title} fill className="object-cover" unoptimized priority />
          ) : (
            <div className="flex h-full items-center justify-center bg-zinc-900">
              <ImageIcon className="size-20 text-white/20" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-[#f5f0eb]" />

          <div className="absolute left-0 right-0 top-0 flex items-start justify-between gap-3 px-8 py-6">
            <Link href="/dashboard/projects" className="inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-sm font-semibold text-zinc-700 backdrop-blur hover:bg-white">
              <ArrowLeft className="size-4" /> Back
            </Link>
            <div className="flex flex-wrap justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setEditForm(toEditForm(projectState));
                  setIsEditOpen((previous) => !previous);
                }}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-zinc-700 backdrop-blur hover:bg-white"
              >
                <Edit3 className="size-3.5" /> Edit
              </button>
              <button
                type="button"
                disabled={publishState || isPublishing}
                onClick={publishCaseStudy}
                className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-white disabled:cursor-not-allowed disabled:opacity-55"
              >
                {isPublishing ? <Loader2 className="size-3.5 animate-spin" /> : <Rocket className="size-3.5" />}
                {publishState ? "Published" : "Publish"}
              </button>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 px-8 pb-10">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-orange-500">Marketing Case Study</p>
            <h1 className="text-4xl font-black leading-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">{projectState.title}</h1>
            {projectState.shortDescription && (
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-white/85">{projectState.shortDescription}</p>
            )}
          </div>
        </div>

        <div className="mx-auto max-w-6xl space-y-6 px-6 py-10">
          {actionError && <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">{actionError}</p>}

          <AnimatePresence>
            {isEditOpen && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="rounded-3xl bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center justify-between gap-2">
                  <h2 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-700">Edit Case Study</h2>
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={() => setIsEditOpen(false)} className="rounded-full border border-zinc-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-zinc-500">Cancel</button>
                    <button type="button" onClick={saveEdits} disabled={isSaving} className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-white disabled:opacity-60">
                      {isSaving ? <Loader2 className="size-3.5 animate-spin" /> : <CheckCircle2 className="size-3.5" />} Save
                    </button>
                  </div>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <input value={editForm.title} onChange={onEditChange("title")} placeholder="Project title" className="rounded-xl border border-zinc-200 px-3 py-2.5 text-sm outline-none ring-orange-300 focus:ring" />
                  <input value={editForm.shortDescription} onChange={onEditChange("shortDescription")} placeholder="Short description" className="rounded-xl border border-zinc-200 px-3 py-2.5 text-sm outline-none ring-orange-300 focus:ring" />
                  <input value={editForm.coverImage} onChange={onEditChange("coverImage")} placeholder="Cover image URL" className="rounded-xl border border-zinc-200 px-3 py-2.5 text-sm outline-none ring-orange-300 focus:ring" />
                  <input value={editForm.tags} onChange={onEditChange("tags")} placeholder="Tags (comma separated)" className="rounded-xl border border-zinc-200 px-3 py-2.5 text-sm outline-none ring-orange-300 focus:ring" />
                  <input value={editForm.galleryImages} onChange={onEditChange("galleryImages")} placeholder="Gallery image URLs (comma separated)" className="rounded-xl border border-zinc-200 px-3 py-2.5 text-sm outline-none ring-orange-300 focus:ring md:col-span-2" />
                  <textarea value={editForm.description} onChange={onEditChange("description")} rows={5} placeholder="Case study description" className="rounded-xl border border-zinc-200 px-3 py-2.5 text-sm outline-none ring-orange-300 focus:ring md:col-span-2" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 rounded-3xl bg-white p-8 shadow-sm lg:col-span-7">
              <span className="mb-4 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-orange-600">Campaign Overview</span>
              <p className="text-lg leading-relaxed text-zinc-700">
                {projectState.shortDescription || "A full-funnel campaign designed to turn category attention into measurable revenue growth."}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-zinc-500">This page now uses the same TanStack Query data flow as project cards.</p>
            </div>
            <div className="col-span-12 grid grid-cols-2 gap-4 lg:col-span-5">
              {[
                { value: "+38%", label: "Qualified Leads" },
                { value: "4.7x", label: "Campaign ROAS" },
                { value: "-29%", label: "Cost Per Conversion" },
                { value: createdDate, label: "Launch Window" },
              ].map(({ value, label }) => (
                <div key={label} className="flex flex-col justify-between rounded-2xl bg-white p-5 shadow-sm">
                  <p className="text-3xl font-black text-zinc-900">{value}</p>
                  <p className="text-xs uppercase tracking-[0.15em] text-zinc-400">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {[
              { title: "Challenge", copy: descriptionParagraphs[0] ?? "Repositioned the narrative for stronger buyer intent.", icon: Megaphone },
              { title: "Strategy", copy: descriptionParagraphs[1] ?? "Built audience-led channel sequencing and creative testing.", icon: Sparkles },
              { title: "Impact", copy: descriptionParagraphs[2] ?? "Improved efficiency, conversion quality, and recall.", icon: TrendingUp },
            ].map(({ title, copy, icon: Icon }) => (
              <div key={title} className="rounded-2xl border-t-4 border-orange-400 bg-white p-5 shadow-sm">
                <Icon className="mb-3 size-5 text-orange-500" />
                <p className="mb-2 text-sm font-bold uppercase tracking-[0.12em] text-zinc-700">{title}</p>
                <p className="text-sm leading-relaxed text-zinc-500">{copy}</p>
              </div>
            ))}
          </div>

          {gallery.length > 0 && (
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-700">Visual Storyboard</h2>
                <button type="button" onClick={() => setLightboxOpen(true)} className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-semibold text-zinc-500 transition hover:border-orange-300 hover:text-orange-600">
                  <ArrowUpRight className="size-3.5" /> Full Gallery
                </button>
              </div>
              <div className="columns-2 gap-4 space-y-4 md:columns-3">
                {gallery.map((src, index) => (
                  <button
                    key={`${src}-${index}`}
                    type="button"
                    onClick={() => {
                      setLightboxIndex(index);
                      setLightboxOpen(true);
                    }}
                    className={`group relative w-full overflow-hidden rounded-2xl bg-zinc-100 shadow-sm ${index % 3 === 0 ? "aspect-[4/5]" : "aspect-video"}`}
                  >
                    <Image src={src} alt={`${projectState.title} gallery ${index + 1}`} fill className="object-cover transition duration-500 group-hover:scale-105" unoptimized />
                    <span className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
                      <span className="rounded-full bg-black/40 p-2.5 backdrop-blur-sm">
                        <ZoomIn className="size-4 text-white" />
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-sm font-black uppercase tracking-[0.2em] text-zinc-700">Campaign Timeline</h2>
            <div className="grid gap-3 md:grid-cols-4">
              {[
                { phase: "Brief & Insight", date: createdDate },
                { phase: "Creative Sprint", date: "Week 2" },
                { phase: "Channel Launch", date: "Week 4" },
                { phase: "Optimization", date: updatedDate },
              ].map(({ phase, date }, index) => (
                <div key={phase} className="rounded-2xl border border-zinc-100 bg-zinc-50 p-4">
                  <p className="text-xs uppercase tracking-[0.15em] text-zinc-400">Step {index + 1}</p>
                  <p className="mt-1 text-sm font-bold text-zinc-800">{phase}</p>
                  <p className="mt-1 text-xs text-zinc-500">{date}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-zinc-200 pt-6">
            <div className="flex flex-wrap items-center gap-2">
              {tags.map((tag) => (
                <span key={tag} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-zinc-500 shadow-sm">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-xs text-zinc-400">
              {publishState
                ? `Published${publishDate ? ` · ${new Date(publishDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}` : ""}`
                : "Draft"}
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
}
