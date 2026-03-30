"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { TeamMember } from "./page";

const EASE = [0.22, 1, 0.36, 1] as const;

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.25 },
  },
} as const;

const staggerChild = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE },
  },
} as const;

interface TeamMemberClientProps {
  member: TeamMember;
}

export default function TeamMemberClient({ member }: TeamMemberClientProps) {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16 md:pt-28 md:pb-20">
      <section className="container mx-auto px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,420px)] lg:gap-12 xl:gap-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="order-2 lg:order-1"
          >
            <motion.div variants={staggerChild}>
              <Link
                href="/#team-partners"
                className="inline-flex items-center gap-2 rounded-sm font-clash text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-foreground/45 transition-colors duration-200 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                  className="shrink-0"
                >
                  <path
                    d="M11 7H3M6 3.5L2.5 7 6 10.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Back to Team
              </Link>
            </motion.div>

            <motion.p
              variants={staggerChild}
              className="mt-8 font-clash text-[0.68rem] font-bold uppercase  text-orange"
            >
              {member.role}
            </motion.p>

            <motion.h1
              variants={staggerChild}
              className="mt-4 font-beni font-black uppercase leading-[0.88] text-foreground"
            >
              {member.name.split(" ").map((word, index) => (
                <span
                  key={word}
                  className=" text-[3.25rem] sm:text-[4.25rem] md:text-[4rem] xl:text-[6rem]"
                >
                  <span
                    className={index === 0 ? "text-foreground" : "text-orange"}
                  >
                    {word}{" "}
                  </span>
                </span>
              ))}
            </motion.h1>

            <motion.div
              variants={staggerChild}
              className="mt-8 grid gap-4 sm:grid-cols-2 xl:max-w-xl"
            >
              <div className="rounded-2xl border border-foreground/10 bg-white/50 px-5 py-4">
                <p className="font-clash text-[0.62rem] font-bold uppercase tracking-[0.2em] text-foreground/35">
                  Location
                </p>
                <p className="mt-1 font-clash text-sm font-semibold text-foreground">
                  {member.location}
                </p>
              </div>
            </motion.div>

            <motion.div variants={staggerChild} className="mt-10 max-w-3xl">
              <p className="font-clash text-lg font-bold uppercase  text-green">
                About
              </p>
              <p className="mt-4 font-clash text-[1rem] leading-8 text-foreground/70 md:text-[1.08rem] md:leading-8">
                {member.bio}
              </p>
            </motion.div>

            <motion.div
              variants={staggerChild}
              className="mt-10 rounded-[1.75rem] border border-foreground/8 bg-foreground/[0.03] p-6 md:p-7"
            >
              <p className="font-clash text-lg font-bold uppercase text-foreground/35">
                Expertise
              </p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {member.expertise.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex rounded-full border border-foreground/10 bg-background px-4 py-2 font-clash text-[0.72rem] font-semibold text-foreground/75"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div variants={staggerChild} className="mt-10">
              <div className="flex flex-col gap-5 rounded-[1.75rem] border border-foreground/8 bg-foreground/[0.03] px-6 py-6 sm:flex-row sm:items-center sm:justify-between md:px-8">
                <div>
                  <p className="font-clash text-[0.65rem] font-bold uppercase  text-orange">
                    Ready to build something real?
                  </p>
                  <h2 className="mt-2 font-beni text-[1.7rem]  font-black uppercase leading-[0.95] text-foreground md:text-[2rem]">
                    Work with us
                  </h2>
                </div>

                <Link
                  href="/contact"
                  className="group inline-flex mt-4 items-center gap-2.5 self-start rounded-xl bg-orange px-6 py-2 font-clash text-sm font-bold text-white shadow-lg shadow-orange/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange/90 hover:shadow-xl hover:shadow-orange/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-95"
                >
                  Get in touch
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                    className="shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                  >
                    <path
                      d="M3 7h8M7.5 3.5L11 7l-3.5 3.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="order-1 lg:order-2 lg:sticky lg:top-32"
          >
            <div className="relative overflow-hidden rounded-[2rem] ">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem]">
                <Image
                  src={member.image}
                  alt={`Portrait of ${member.name}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover object-top"
                  priority
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-orange/10 via-transparent to-[#00522D]/10" />
              </div>

              <div className="absolute bottom-8 left-8 rounded-2xl bg-foreground px-5 py-4 shadow-xl">
                <p className="font-clash text-[0.55rem] font-bold uppercase tracking-[0.2em] text-white/45">
                  Experience
                </p>
                <p className="mt-1 font-beni text-xl font-black uppercase leading-none text-white">
                  {member.experience}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
