"use client";

import Image from "next/image";
import { useState } from "react";

type TeamMember = {
  name: string;
  role: string;
  image: string;
  bio: string;
};

const teamMembers: TeamMember[] = [
  {
    name: "Fahad Bashir",
    role: "Co-Founder & CEO",
    image: "/team-2.jpeg",
    bio: "After leading commercial strategy across WPP and GroupM in Pakistan, Indonesia, and Australia - working with brands like Unilever, Gillette, and GSK - Fahad saw exactly where creator marketing breaks down at the execution level. EchoVerse is built from that experience: a system where influence stops being an activity and starts being a measurable business outcome.",
  },
  {
    name: "Shoaib Hussain",
    role: "Director & Head of Operations",
    image: "/team.webp",
    bio: "With 10 years of media experience across HUM TV, GEO, and ARY, Shoaib has worked at the center of how audience attention is built, monetized, and scaled. He now applies that operational depth to build creator-led systems that deliver measurable outcomes across clients in Pakistan.",
  },
  {
    name: "Ovais Ilyas",
    role: "Country Lead",
    image: "/team-4.png",
    bio: "Two decades across WPP Media, Spark Foundry, and Carat managing portfolios for Unilever, Coca-Cola, and Jazz gave Ovais a rare view of what great strategy looks like - and where most agencies lose it in execution. He's now bringing that discipline and accountability back to how Pakistani brands grow through creators.",
  },
];

const TeamPartners = () => {
  const [active, setActive] = useState(0);
  const member = teamMembers[active];

  return (
    <section className="relative bg-background py-16 md:py-24">
      <div className="mx-auto w-full container px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="font-beni text-[1.9rem] leading-[0.9] font-black uppercase  md:text-4xl lg:text-[4rem]">
              <span className="block text-foreground">Built by people who&apos;ve</span>
              <span className="block text-orange text-8xl">
                run the system
              </span>
            </h2>
            <p className="font-clash text-sm md:text-base text-foreground/50 mt-4 max-w-md leading-relaxed">
              Now rebuilding it with intent - combining global experience with a focused vision for Pakistan&apos;s creator economy.
            </p>
          </div>
        </div>

        {/* Mobile: horizontal snap-scroll cards */}
        <div className="md:hidden -mx-6 flex snap-x snap-mandatory overflow-x-auto gap-4 px-6 pb-2">
          {teamMembers.map((m) => (
            <div
              key={m.name}
              className="min-w-[78vw] snap-start overflow-hidden rounded-2xl bg-foreground/[0.04] ring-1 ring-foreground/8"
            >
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={m.image}
                  alt={m.name}
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                  <p className="font-clash text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-green/90">
                    {m.role}
                  </p>
                  <h3 className="mt-0.5 font-clash text-lg font-bold leading-tight text-white">
                    {m.name}
                  </h3>
                </div>
              </div>
              <div className="p-4">
                <p className="font-clash text-[0.78rem] leading-relaxed text-foreground/50 line-clamp-3">
                  {m.bio}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: interactive spotlight grid */}
        <div className="hidden md:grid grid-cols-1 gap-4 lg:grid-cols-[1fr_260px] lg:gap-4">
          {/* Featured card */}
          <div className="overflow-hidden rounded-2xl bg-foreground/[0.04] ring-1 ring-foreground/8">
            <div className="flex flex-col md:flex-row md:h-full">
              {/* Portrait */}
              <div className="relative h-full w-full flex-shrink-0 md:h-auto md:w-[220px] lg:w-[280px]">
                <Image
                  key={active}
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top"
                />
                {/* subtle side fade on desktop */}
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-foreground/[0.04] hidden md:block" />
              </div>

              {/* Content */}
              <div className="relative flex flex-col justify-between gap-6 p-7 md:p-9 md:overflow-hidden">
                {/* Big decorative index */}
                <span className="pointer-events-none absolute right-6 top-4 font-beni text-[7rem] leading-none font-black text-orange/20 select-none">
                  {String(active + 1).padStart(2, "0")}
                </span>

                <div className="relative z-10">
                  <p className="font-clash text-[1rem] font-semibold uppercase  text-green">
                    {member.role}
                  </p>
                  <h3 className="mt-1.5 font-clash text-2xl font-bold text-foreground md:text-[3.5rem]">
                    {member.name}
                  </h3>
                </div>

                {/* Bio - scrollable */}
                <div className="relative z-10 flex-1 overflow-y-auto pr-1  [&::-webkit-scrollbar]:w-[3px] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-green/40 [&::-webkit-scrollbar-track]:bg-transparent">
                  <p className="font-clash text-[1.1rem] leading-[2] text-foreground/50">
                    {member.bio}
                  </p>
                </div>

                {/* Progress dots */}
              </div>
            </div>
          </div>

          {/* Selector - stacked on desktop only */}
          <div className="flex flex-row gap-3 lg:flex-col lg:gap-4">
            {teamMembers.map((m, i) => (
              <button
                key={m.name}
                onClick={() => setActive(i)}
                className={`group relative flex-1 overflow-hidden rounded-2xl transition-all duration-300 lg:flex-auto lg:min-h-0 ${
                  active === i
                    ? "ring-2 ring-green ring-offset-2 ring-offset-background"
                    : "opacity-60 hover:opacity-85"
                }`}
              >
                <div className="relative aspect-[3/2] lg:aspect-[4/3]">
                  <Image
                    src={m.image}
                    alt={m.name}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-3 text-left">
                    <p className="font-clash text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-green/90">
                      {m.role}
                    </p>
                    <p className="font-clash text-xs font-bold text-white leading-tight">
                      {m.name.split(" ")[0]}
                    </p>
                  </div>
                  {active === i && (
                    <div className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-green shadow-[0_0_6px_2px_rgba(21,128,61,0.6)]" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamPartners;
