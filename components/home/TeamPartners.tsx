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
    name: "Fahad Bashir Bhura",
    role: "Co-Founder & CEO",
    image: "/team-2.jpeg",
    bio: "Fahad is the Co-Founder & CEO of Echoverse 360, bringing over two decades of global media and commercial leadership across WPP in Pakistan, Indonesia, and Australia. He has led large-scale media investments, commercial strategy, and strategic partnerships for major brands including Unilever, Pepsi Cola International, Gillette, and GST. Before Echoverse 360, he held leadership roles across GroupM and IPG Mediabrands, including Managing Director Asia Pacific and Chief Investment Officer at GroupM Indonesia. His work has focused on commercial transformation, structured negotiations, and scalable investment frameworks across markets. At Echoverse 360, he is building a next-generation digital ecosystem that combines creativity, technology, and data to deliver transparency, efficiency, and performance in creator and digital marketing.",
  },
  {
    name: "Shoaib Hussain",
    role: "CEO",
    image: "/team.webp",
    bio: "Shoaib is the CEO of The Huddle Room with 10 years of media industry experience, leading sales, marketing, and business development across clients under The Huddle Room umbrella. He has extensive expertise in digital sales and marketing, with hands-on work alongside major media buying houses including GroupM, Starcom, Mediacom, and Manhattan, and brands such as Mondelez, Pepsi, Unilever, and Coca-Cola. A team leader with a diverse skill set across content creation, business development, sales, and operations, he has also worked with top TV channels in Pakistan including HUM TV, GEO Entertainment, and ARY Digital, delivering customized TV and digital content for target audiences. He is recognized as a trendsetter in achieving benchmark business volume for HUM TV Digital sales and sponsorships, as well as for FM106.2, Pakistan's leading radio network. As the media landscape evolves, Shoaib continues to diversify into new mediums through customized, tailor-made digital campaigns.",
  },
  {
    name: "Ovais Ilyas",
    role: "Co-Founder & Country Lead",
    image: "/team-4.png",
    bio: "Ovais is a seasoned marketing and communications leader with over two decades of experience driving business growth, transforming organizations, and building high-performing teams across Pakistan's media and marketing landscape. His career spans both broadcasters and leading global agency networks, including WPP Media (formerly GroupM), Spark Foundry, ZenithOptimedia, and Carat, where he led major portfolios across FMCG, telecom, banking, automotive, technology, and retail. He has led and partnered with brands including Unilever, Colgate-Palmolive, Zong, Reckitt, Foodpanda, McDonald's, Changan Automobile, Hamdard Laboratories, Shan Foods, Ismail Industries, Xiaomi, and J., while also driving strategic transitions for The Coca-Cola Company and Jazz. Known for strategic foresight, crisis management, and a people-first leadership style, Ovais has consistently unlocked new revenue streams, onboarded high-value clients, and delivered record business growth by building integrated 360-degree teams.",
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
              <span className="block text-foreground">Partnered with</span>
              <span className="block text-orange text-8xl">
                industry leaders
              </span>
            </h2>
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

                {/* Bio — scrollable */}
                <div className="relative z-10 flex-1 overflow-y-auto pr-1  [&::-webkit-scrollbar]:w-[3px] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-green/40 [&::-webkit-scrollbar-track]:bg-transparent">
                  <p className="font-clash text-[1.1rem] leading-[2] text-foreground/50">
                    {member.bio}
                  </p>
                </div>

                {/* Progress dots */}
              </div>
            </div>
          </div>

          {/* Selector — stacked on desktop only */}
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
