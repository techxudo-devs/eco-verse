"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/app/generated/prisma/client";

type ProjectsShowcaseProps = {
  projects: Project[];
};

const ProjectsShowcase = ({ projects }: ProjectsShowcaseProps) => {
  // Take first 8 projects and assign alternating alignment
  const showcaseProjects = projects.slice(0, 8).map((project, index) => ({
    ...project,
    align: index % 2 === 0 ? ("left" as const) : ("right" as const),
  }));

  return (
    <section className="relative bg-[#FFEDD5] py-20 md:py-24">
      <div className="mb-20 text-center md:mb-28">
        <h2 className="font-beni text-6xl uppercase leading-none text-[#00522D] md:text-[10rem] lg:text-[12rem]">
          Projects
        </h2>
      </div>

      <div className="absolute left-1/2 top-[240px] hidden w-px -translate-x-1/2 bg-[#F97316]/20 md:block bottom-0" />

      <div className="container mx-auto space-y-10 px-6 md:space-y-14">
        {showcaseProjects.length === 0 ? (
          <div className="mx-auto max-w-2xl rounded-3xl border-2 border-dashed border-[#F97316]/30 bg-white/50 px-8 py-16 text-center shadow-lg backdrop-blur-sm">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#F97316]/10">
              <svg
                className="h-10 w-10 text-[#F97316]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="font-beni text-2xl font-bold uppercase text-[#00522D]">
              No Projects Yet
            </h3>
            <p className="mt-2 font-clash text-sm text-zinc-600">
              Projects will appear here once they're added to the dashboard.
            </p>
          </div>
        ) : (
          showcaseProjects.map((project) => (
            <div
              key={project.id}
              className={`relative flex flex-col items-center md:flex-row ${
                project.align === "left"
                  ? "md:justify-start"
                  : "md:justify-end"
              }`}
            >
              <div
                className={`award-scroll ${
                  project.align === "left"
                    ? "award-left bg-white md:ml-24"
                    : "award-right bg-white md:mr-24"
                } w-full max-w-[360px] overflow-hidden rounded-3xl border-2 border-[#F97316]/20 shadow-xl transition-all duration-300 hover:shadow-2xl md:max-w-[420px]`}
              >
                {/* Project Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100">
                  {project.coverImage ? (
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      unoptimized
                      className="object-cover transition duration-700 hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#F97316] to-[#15803d]">
                      <svg
                        className="h-16 w-16 text-white/40"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                {/* Project Content */}
                <div className="space-y-4 p-6">
                  <h3 className="font-beni text-xl font-black uppercase leading-tight text-[#00522D] md:text-2xl">
                    {project.title}
                  </h3>

                  <p className="line-clamp-3 font-clash text-sm leading-relaxed text-zinc-700 md:text-base">
                    {project.shortDescription || "Explore this amazing project"}
                  </p>

                  {/* Tags */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-gradient-to-r from-[#F97316]/10 to-[#15803d]/10 px-3 py-1 font-clash text-[10px] font-bold uppercase text-[#00522D]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* View Button */}
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex w-full items-center justify-center rounded-full bg-[#F97316] px-6 py-3 font-clash text-sm font-bold uppercase tracking-[0.12em] text-white shadow-lg transition-all hover:scale-105 hover:bg-[#ff6b35]"
                  >
                    View Project
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* View All Projects Link */}
      {showcaseProjects.length > 0 && (
        <div className="mt-16 text-center md:mt-20">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#00522D]/30 bg-white px-8 py-4 font-clash text-sm font-bold uppercase tracking-[0.16em] text-[#00522D] shadow-lg transition-all hover:scale-105 hover:border-[#00522D] hover:shadow-xl"
          >
            View All Projects
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      )}
    </section>
  );
};

export default ProjectsShowcase;
